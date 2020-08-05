import React, { Component, createRef } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

interface DefaultProps { 
    loadScript: string,
    injectionScript?: string,
    shouldInjectScript?: boolean,
    onMessage?: (event: any) => void,
    onScriptInjection?: () => void
}

class TalkUI extends Component<DefaultProps, object> {         
    private webView = createRef<WebView>();

    shouldComponentUpdate(nextProps: any) {
        if (nextProps.shouldInjectScript) {
            this.injectJavaScript(nextProps.injectionScript);

            if (this.props.onScriptInjection) {
                this.props.onScriptInjection();
            }
        }
        return false;
    }



    componentWillUnmount() {
        this.injectJavaScript('window.ui.destroy();');
    }

    injectJavaScript(script: string) {
        if (this.webView) {
            this.webView.current!.injectJavaScript(script);
        }
    }

    render() {
        return (
            <WebView
                ref={this.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={ Platform.OS === 'ios' ? require('./talkjs-container.html') : { uri: 'file:///android_asset/html/talkjs-container.html' } }
                injectedJavaScript={this.props.loadScript}
                onMessage={this.props.onMessage}
            />
        );
    }
}

export default TalkUI;