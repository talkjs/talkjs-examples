import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { toast } from 'react-toastify';

import * as talkSession from '../../shared/talk/talk-session';
import { User } from 'src/shared/models/user.model';
import LoginPage from 'src/pages/Login/LoginPage';
import { login } from 'src/core/modules/authentication.module';
import { login as loginStore } from 'src/shared/store/actions/authentication.actions';

interface DefaultProps { 
  loginStore: (user: User) => void
}

class LoginPageContainer extends React.Component<DefaultProps, object> {

  async performLoginAttempt(username: string) {
    const loginAttemptUser = await login(username);

    if (loginAttemptUser) {
        toast.success('Successful login', {
          position: toast.POSITION.BOTTOM_RIGHT
        });

        const user = {...loginAttemptUser, products: [], addProduct: () => Function}
        this.props.loginStore(user);

        talkSession.initialize(user);
    } else {
      toast.error('Incorrect credentials', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }
  
  handleLoginAttempt = (username: string) => {
    this.performLoginAttempt(username);
  } 
    
  public render() {
    return (<LoginPage onLoginAttempt={this.handleLoginAttempt} />);
  }
}

const mapStateToProps = (state: any, props: any) => {
  return { };
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
  return bindActionCreators({ loginStore: loginStore }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
