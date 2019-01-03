import * as React from 'react';

import * as Talk from 'talkjs';
import InboxPage from './InboxPage';
import * as talkSession from '../../shared/talk/talk-session';
import { destroyAllPopups } from 'src/shared/utils/talk.util';

interface DefaultProps { }
interface DefaultState { 
  talkSession: Talk.Session | null
}

class InboxPageContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
        talkSession: null
    };
  }

  async componentDidMount() {
    const session = await talkSession.get();
    
    this.setState({
      talkSession: session
    });

    destroyAllPopups();
  }
    
  public render() {
    return (
        <InboxPage 
         talkSession={this.state.talkSession}
        />
    );
  }
}

export default InboxPageContainer;

