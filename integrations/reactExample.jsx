import React from "react";
import ReactDOM from "react-dom";

(function(t,a,l,k,j,s){
    s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.getElementsByTagName('head')[0].appendChild(s);
    t.Talk={ready:{then:function(c){if(l)return new l(function(r,e){k.push([c,r,e]);});k.push([c]);},catch:function(){return l&&new l();},c:k}};
})(window,document,Promise,[]);

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.talkSession = undefined;
    }

    componentDidMount() {
        // Promise can be `then`ed multiple times
        window.Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: "12345231",
                    name: "George Looney",
                    email: "george@looney.net",
                    photoUrl: "https://talkjs.com/docs/img/george.jpg",
                    welcomeMessage: "Hey there! How are you? :-)"
                });
                
                this.talkSession = new Talk.Session({
                    appId: "Hku1c4Pt",
                    publishableKey: "984769823478928374",
                    me: me
                });
                
                const other = new Talk.User({
                    id: "54321",
                    name: "Ronald Raygun",
                    email: "ronald@teflon.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    welcomeMessage: "Hey there! Love to chat :-)"
                });

                const conversation = this.talkSession.getOrStartConversation(other);
                const inbox = this.talkSession.createInbox({selected: conversation});
                inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    render() {
        return <span>
            <div ref={c => this.container = c}>Loading...</div>
        </span>;
    }
}


window.view = ReactDOM.render(<Example/>, document.getElementById("hello"));