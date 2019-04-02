import * as React from 'react';

import './styles.css';

import Talk from 'talkjs';

import Inbox from '../../components/Inbox/Inbox';

interface DefaultProps {
  talkSession: Talk.Session | null
}

class InboxPage extends React.Component<DefaultProps, object> {
    
  public render() {
    return (
        <div className="InboxPage">
          <Inbox 
              loadingMessage='Loading chats...'
              height={505}
              session={this.props.talkSession}
          />
        </div>
    );
  }
}

export default InboxPage;
