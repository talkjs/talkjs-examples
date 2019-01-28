import React, { Component } from 'react';
import { WebView, Platform } from 'react-native';

interface DefaultProps { 
    loadScript: string,
    injectionScript?: string,
    shouldInjectScript?: boolean,
    onMessage?: (event: any) => void,
    onScriptInjection?: () => void
}

class TalkUI extends Component<DefaultProps, object> {

    private webView: any;

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
            this.webView.injectJavaScript(script);
        }
    }

    render() {
        return (
            <WebView
                ref={r => this.webView = r}
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