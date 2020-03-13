package com.talkjs.basicexample;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;

import com.google.gson.Gson;

import java.util.Timer;
import java.util.TimerTask;

/**
 * This class contains all functions that can be called from chat.js.
 */
class JavascriptCallbacks {
    private Activity activity;
    private Options options;
    private Gson gson = new Gson();
    private final Timer loadTimeout;

    /**
     * These settings control how chat.js initializes TalkJS inside the WebView.
     */
    static class Options {
        // Replace this by your actual appId. Find it in the TalkJS dashboard.
        public final String appId = "tlg6pl69";
        public final String uiType;
        public final TalkJSUser currentUser = TalkJSUser.currentUser;
        public final TalkJSUser chatWith;
        public final String conversationId;

        Options(String uiType) {
            this.uiType = uiType;
            chatWith = null;
            conversationId = null;
        }

        Options(String uiType, TalkJSUser chatWith, String conversationId) {
            this.uiType = uiType;
            this.conversationId = conversationId;
            this.chatWith = chatWith;
        }
    }

    JavascriptCallbacks(Options options, Activity activity) {
        this.options = options;
        this.activity = activity;

        // If the network is unreachable or TalkJS is down, `showChatUi` below will never be called,
        // and we'd be showing a spinner that spins forever. That's terrible, so let's add a timeout
        // that lets the user retry or back out.
        this.loadTimeout = new Timer();
        this.loadTimeout.schedule(new TimerTask() {
            @Override
            public void run() {
                showLoadError();
            }
        }, 10000);
    }

    // Note: If you target API level 17 or above, you *must* annotate each method with @JavascriptInterface.
    // Otherwise, you *must* remove the annotations.
    @JavascriptInterface
    public String getOptions() {
        return gson.toJson(options);
    }

    @JavascriptInterface
    public void showChatUi() {
        this.loadTimeout.cancel();

        // This shows the TalkJS webview full size, and hides the loading animation.
        // Much of the code below is a workaround, see `talkjs_layout.xml` for more background.
        activity.runOnUiThread(() -> {
            View spinner = activity.findViewById(R.id.talkjs_loading_spinner);
            View webView = activity.findViewById(R.id.talkjs_webview);
            spinner.setVisibility(View.GONE);
            webView.getLayoutParams().height = ViewGroup.LayoutParams.MATCH_PARENT;
            webView.requestLayout();
        });
    }

    @JavascriptInterface
    public void openConversation(String conversationId, String name) {
        Intent intent = new Intent(activity, ChatboxActivity.class);
        intent.putExtra("conversationId", conversationId);
        intent.putExtra("name", name);
        activity.startActivity(intent);
    }

    private void showLoadError() {
        activity.runOnUiThread(() -> {
            AlertDialog.Builder builder = new AlertDialog.Builder(activity);
            builder.setMessage(R.string.chat_timeout_message)
                    .setTitle(R.string.chat_timeout_title)
                    .setPositiveButton(R.string.retry, (dialog, id) -> activity.recreate())
                    .setNegativeButton(R.string.back, (dialog, id) -> activity.onBackPressed())
                    .create()
                    .show();
        });
    }
}
