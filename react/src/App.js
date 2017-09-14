import React, {
    Component
} from "react";
import Talk from "talkjs";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.talkSession = undefined;
    }

    componentDidMount() {
        // Promise can be `then`ed multiple times
        Talk.ready
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
                const inbox = this.talkSession.createInbox({
                    selected: conversation
                });
                inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    render() {
        return (<span>
            <div ref={c => this.container = c}>Loading...</div>
        </span>);
    }
}
