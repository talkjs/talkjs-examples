import * as React from 'react';
import { Alert } from 'react-bootstrap';

import './styles.css';

interface DefaultProps { onLoginAttempt: (username: string) => void }

class LoginPage extends React.Component<DefaultProps, object> {

  private tfUsername: HTMLInputElement | null;

  handleLoginAttempt = (e: any) => {
    e.preventDefault();

    if (this.tfUsername) {
      this.props.onLoginAttempt(this.tfUsername.value);
    }
  }
    
  public render() {
    return (
      <div className="Login">
        <Alert bsStyle="info">
          Try logging into 'Jason'.
        </Alert>
        <form  className="form">
          <div className="login-form">
            <input type="text" className="form-control" ref={(ref) => this.tfUsername = ref} placeholder="username"/>
            <button onClick={this.handleLoginAttempt} type="submit" id="login-btn">login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
