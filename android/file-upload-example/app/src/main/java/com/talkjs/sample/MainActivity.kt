package com.talkjs.sample

import android.app.Activity
import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.util.AttributeSet
import android.view.View
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputConnection
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ContentInfoCompat
import androidx.core.view.OnReceiveContentListener
import androidx.core.view.ViewCompat
import androidx.core.view.inputmethod.EditorInfoCompat
import androidx.core.view.inputmethod.InputConnectionCompat
import com.talkjs.sample.databinding.ActivityMainBinding
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

private val MIME_TYPES = arrayOf("image/*", "video/*")

class MainActivity : AppCompatActivity() {
    var filePath: ValueCallback<Array<Uri>>? = null;
    private val html = """
       <!DOCTYPE html>
       <head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <script>
           (function(t,a,l,k,j,s){
           s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
           ;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
           .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);
          </script>
       </head>
       <body style="margin: 0px;">
         <div id="talkjs-container" style="width: 100%; height: 750px"></div>
       </body>
       <script type="module">
         await Talk.ready;
    
         const me = new Talk.User({
             id: '432156789',
             name: 'Sebastian',
             email: 'Sebastian@example.com',
             photoUrl: 'https://demo.talkjs.com/marketplace_demo/img/sebastian.jpg',
             welcomeMessage: null,
             role: 'default',
         });
    
         const other = new Talk.User({
             id: '123456789',
             name: 'Alice',
             email: 'alice@example.com',
             photoUrl: 'https://demo.talkjs.com/marketplace_demo/img/alice.jpg',
             welcomeMessage: null,
             role: 'default',
         });
    
         const talkSession = new Talk.Session({
            appId: 'YOUR_APP_ID',
            me: me,
         });
    
         const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
    
         conversation.setParticipant(me);
         conversation.setParticipant(other);
    
         window.chatbox = talkSession.createChatbox(conversation);
         window.chatbox.mount(document.getElementById('talkjs-container'));
    
         window.chatbox.select(conversation);
       </script>
    
       </html>
    """.trimIndent()

    private lateinit var binding: ActivityMainBinding

    val getFile = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
        if (it.resultCode == Activity.RESULT_CANCELED) {
            filePath?.onReceiveValue(null)
        } else if (it.resultCode == Activity.RESULT_OK && filePath != null) {
            filePath!!.onReceiveValue(
                WebChromeClient.FileChooserParams.parseResult(it.resultCode, it.data))
            filePath = null
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val webView = binding.webView
        ViewCompat.setOnReceiveContentListener(webView, MIME_TYPES, MyReceiver())

        webView.settings.javaScriptEnabled = true
        webView.webChromeClient = MyWebChromeClient(this)
        webView.loadDataWithBaseURL(
            "https://app.talkjs.com", // This is needed for Same-Origin policy purposes
            html,
            "text/html",
            null,
            "https://app.talkjs.com"
        )
    }
}

class MyWebChromeClient(private val myActivity: MainActivity) : WebChromeClient() {
    override fun onShowFileChooser(
        webView: WebView?,
        filePathCallback: ValueCallback<Array<Uri>>?,
        fileChooserParams: FileChooserParams?
    ): Boolean {
        myActivity.filePath = filePathCallback

        val contentIntent = Intent(Intent.ACTION_GET_CONTENT)
        contentIntent.type = "*/*"
        contentIntent.addCategory(Intent.CATEGORY_OPENABLE)

        myActivity.getFile.launch(contentIntent)
        return true
    }
}

class MyReceiver() : OnReceiveContentListener {

    private fun getFileName(contentResolver: ContentResolver, uri: Uri): String? {
        val cursor = contentResolver.query(uri, null, null, null, null, null)
        return cursor?.use {
            val nameIndex = it.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            it.moveToFirst()

            cursor.getString(nameIndex)
        }
    }

    override fun onReceiveContent(view: View, payload: ContentInfoCompat): ContentInfoCompat? {
        val split = payload.partition { item -> item.uri != null }
        val uriContent = split.first
        val remaining = split.second

        val clip = uriContent.clip
        if (clip.itemCount > 0) {
            val contentResolver = view.context.contentResolver

            val uri = clip.getItemAt(0).uri
            val mimeType = contentResolver.getType(uri)
            val fileName = getFileName(contentResolver, uri)

            val bufferedInputStream = contentResolver.openInputStream(uri)?.buffered()
            val javaScript = bufferedInputStream.use {
                val jsonByteArray = Json.encodeToString(it?.readBytes())
                """
                var byteArray = new Int8Array($jsonByteArray);
                var mediaFile = new File([byteArray], "$fileName", { type: "$mimeType" });
                window.chatbox.sendFile(mediaFile);
                """.trimIndent()
            }

            // WebView methods all need to be called from the same thread
            val myWebView = view as MyWebView
            myWebView.post {
                myWebView.evaluateJavascript(javaScript, null)
            }
        }
        return remaining
    }
}

class MyWebView : WebView {

    constructor(context: Context) : super(context)
    constructor(context: Context, attributeSet: AttributeSet) : super(context, attributeSet)

    // This is necessary as the default WebView's implementation of onCreateInputConnection bypasses onReceiveContentListener
    override fun onCreateInputConnection(outAttrs: EditorInfo): InputConnection? {
        val inputConnection = super.onCreateInputConnection(outAttrs)
        if (inputConnection == null) {
            return inputConnection
        }

        EditorInfoCompat.setContentMimeTypes(outAttrs, MIME_TYPES)
        return InputConnectionCompat.createWrapper(this, inputConnection, outAttrs)
    }
}