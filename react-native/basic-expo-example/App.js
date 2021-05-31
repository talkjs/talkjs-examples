import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview'

export const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
        (function(t,a,l,k,j,s){
        s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
        ;k=t.Promise;t.Talk={v:3,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
        .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);
      </script>
    </head>
    <body>
      <div>
        <div id="talkjs-container" style="width: 100%; height: 800px"><i>Loading chat...</i></div>
      </div>
    </body>
  </html>
`

const injectedJavaScript = `
  Talk.ready.then(() => {
    var me = new Talk.User({
      id: "123456",
      name: "Alice",
      email: "alice@example.com",
      photoUrl: "https://demo.talkjs.com/img/alice.jpg",
      welcomeMessage: "Hey there! How are you? :-)"
    });

    window.talkSession = new Talk.Session({
      appId: "Hku1c4Pt",
      me: me,
    });

    var other = new Talk.User({
      id: "654321",
      name: "Sebastian",
      email: "Sebastian@example.com",
      photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
      welcomeMessage: "Hey, how can I help?",
    });

    var conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );

    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var inbox = talkSession.createInbox({ selected: conversation });

    inbox.mount(document.getElementById("talkjs-container"));
  }).catch((e) => {
    window.ReactNativeWebView.postMessage("Error: " + JSON.stringify(e.stack))
    alert(e)
  })
`

const baseUrl = 'https://talkjs.com'

export default function App() {

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ baseUrl: baseUrl, html: html }}
        style={{ flex: 1, marginTop: 40 }} // Making sure chat is full-height
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        injectedJavaScript={injectedJavaScript}
        originWhitelist={['file://', 'https://*']}
      />
      <StatusBar style="light"  />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
