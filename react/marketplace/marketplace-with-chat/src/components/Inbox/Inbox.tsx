import * as React from 'react';

import Talk from 'talkjs';
import { InboxOptions } from 'talkjs/types/talkjs/published/UIOptions';

interface DefaultProps extends InboxOptions {
    loadingMessage?: string,
    height?: number,
    width?: number,
    
    session: Talk.Session | null
}

class Inbox extends React.Component<DefaultProps, object> {

  private container: any;
  private inbox: Talk.Inbox;

  async initialize() {
    if (!this.props.session) {
        return;
    }

    const inboxOptions = {...this.props};
    delete inboxOptions.loadingMessage;
    delete inboxOptions.height;
    delete inboxOptions.width;
    delete inboxOptions.session;

    this.inbox = this.props.session.createInbox(inboxOptions);
    this.inbox.mount(this.container);
  }

  componentDidUpdate() {
    this.initialize();
  }

  componentWillUnmount() {
    if (this.inbox) {
      this.inbox.destroy();
    }
  }
    
  public render() {
    return (
            <div id="Inbox" style={{height: this.props.height, width: this.props.width, textAlign: 'center'}} ref={container => this.container = container}>
                {this.props.loadingMessage}
            </div>);
  }
}

export default Inbox;
