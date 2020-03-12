package com.talkjs.basicexample;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;
import com.talkjs.basicexample.JavascriptCallbacks.Options;


public class ChatboxActivity extends AppCompatActivity {

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.talkjs_layout);

        Bundle extras = getIntent().getExtras();

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(String.format("Chat with %s", extras.getString("name")));

        WebView webView = findViewById(R.id.talkjs_webview);
        webView.getSettings().setJavaScriptEnabled(true);

        Options options = new Options(
            "chatbox",
            (TalkJSUser)extras.get("chatWith"),
            extras.getString("conversationId")
        );
        webView.addJavascriptInterface(new JavascriptCallbacks(options, this), "app");
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        finish();
        return true;
    }
}