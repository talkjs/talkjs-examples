import * as React from 'react';

import * as Talk from 'talkjs';
import { ChatboxOptions } from 'talkjs/types/talkjs/published/UIOptions';

interface DefaultProps extends ChatboxOptions {
    loadingMessage?: string,
    height?: number,
    minWidth?: number,
    
    session: Talk.Session | null,
    conversation: Talk.ConversationBuilder | Talk.Conversation | null
}

class Chatbox extends React.Component<DefaultProps, object> {

  private container: any;
  private chatbox: Talk.Chatbox;

  async initialize() {
    if (!this.props.session || !this.props.conversation) {
        return;
    }

    const chatboxOptions = {...this.props};
    delete chatboxOptions.loadingMessage;
    delete chatboxOptions.height;
    delete chatboxOptions.minWidth;
    delete chatboxOptions.session;
    delete chatboxOptions.conversation;

    this.chatbox = this.props.session.createChatbox(this.props.conversation, chatboxOptions);
    this.chatbox.mount(this.container);
  }

  componentDidUpdate() {
    this.initialize();
  }

  componentWillUnmount() {
    if (this.chatbox) {
      this.chatbox.destroy();
    }
  }
    
  public render() {
    return (
            <div id="Chatbox" style={{height: this.props.height, width: this.props.minWidth, textAlign: 'center'}} ref={container => this.container = container}>
                {this.props.loadingMessage}
            </div>);
  }
}

export default Chatbox;
