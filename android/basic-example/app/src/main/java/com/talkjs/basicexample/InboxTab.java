package com.talkjs.basicexample;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.talkjs.basicexample.JavascriptCallbacks.Options;

public class InboxTab extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View inboxTabView = inflater.inflate(R.layout.talkjs_layout, container, false);

        WebView webView = inboxTabView.findViewById(R.id.talkjs_webview);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(new JavascriptCallbacks(new Options("inbox"), getActivity()), "app");

        webView.loadUrl("file:///android_asset/index.html");
        return inboxTabView;
    }
}
