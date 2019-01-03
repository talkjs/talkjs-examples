import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import * as Talk from 'talkjs';

import routerHistory from '../../shared/router-history/router-history';

import UserProfilePage from './UserProfilePage';
import LoadingPage from '../Loading/LoadingPage';

import { Product } from 'src/shared/models/product.model';
import { getIdFromURL } from 'src/shared/utils/url.util';
import { getUser } from 'src/core/modules/user.module';
import { User } from 'src/shared/models/user.model';
import * as talkSession from '../../shared/talk/talk-session';
import { getOrCreateConversation } from 'src/shared/utils/talk.util';

interface DefaultProps { currentUser: User }
interface DefaultState { 
  profileUser: User | null,
  talkSession: Talk.Session | null,
  talkConversation: Talk.ConversationBuilder | null
}

class UserProfilePageContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      profileUser: null,
      talkSession: null,
      talkConversation: null
    };
  }

  handleProductClick = (product: Product) => {
    routerHistory.push('/products/' + product.id);
  }

  handleIncorrectIdParameter() {
    routerHistory.replace('/404');
  }

  async componentDidMount() {
    /* Profile Page User Loading */
    const userId = getIdFromURL('/users/');

    if (!userId) {
      this.handleIncorrectIdParameter();
      return;
    }

    const profileUser = await getUser(userId);

    this.setState({
      profileUser: profileUser
    });

    /* TalkJS */
    const session = await talkSession.get();
    const conversation = await getOrCreateConversation(session, this.props.currentUser, profileUser);

    this.setState({
      talkSession: session,
      talkConversation: conversation
    });
  }
    
  public render() {
    if (!this.state.profileUser) {
      return <LoadingPage />
    }
    
    return (<UserProfilePage 
            handleProductclick={this.handleProductClick}
            profileUser={this.state.profileUser}
            talkSession={this.state.talkSession}
            talkConversation={this.state.talkConversation}
            />);
  }
}

const mapStateToProps = (state: any, props: any) => {
  return { currentUser: state.authentication.currentUser };
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePageContainer);

