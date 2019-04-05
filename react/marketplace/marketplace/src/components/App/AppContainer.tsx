import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import App from './App';

import { User } from 'src/shared/models/user.model';

interface DefaultProps { 
  currentUser: User,
  isLoading: boolean
}

class AppContainer extends React.Component<DefaultProps, object> {

  public render() {
    return (<App 
              hasLoggedInUser={this.props.currentUser != null} 
              isLoadingAuthentication={this.props.isLoading}
              />);
  }
}

const mapStateToProps = (state: any, props: any) => {
    return { 
        currentUser: state.authentication.currentUser,
        isLoading: state.authentication.isLoading
    };
  }
  
const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
