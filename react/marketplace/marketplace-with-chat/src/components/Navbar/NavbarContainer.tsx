import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { User } from 'src/shared/models/user.model';
import { logout } from 'src/core/modules/authentication.module';
import { logout as logoutFromStore } from 'src/shared/store/actions/authentication.actions';
import Navbar  from './Navbar';

interface DefaultProps { 
  loggedInUser: User,
  logoutFromStore: () => void
}

class NavbarContainer extends React.Component<DefaultProps, object> {

  handleLogout = () => {
    this.props.logoutFromStore();
    logout();
    window.location.reload();
  }

  public render() {
    return (
        <Navbar 
          loggedInUser={this.props.loggedInUser}
          onLogout={this.handleLogout}
        />
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  return { 
    loggedInUser: state.authentication.currentUser  
  };
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
  return bindActionCreators({ logoutFromStore: logoutFromStore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
