import * as React from 'react';

import './styles.css';

import { NavLink } from 'react-router-dom';

import { User } from 'src/shared/models/user.model';

interface DefaultProps { 
  loggedInUser: User,
  onLogout: () => void
}

class Navbar extends React.Component<DefaultProps, object> {

  handleOnLogout = () => {
    this.props.onLogout();
  }

  public render() {
    return (
      <div>
        <ul className="navbar navbar-dark bg-dark fixed-top">
          <div className="left-nav-items">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">All Products</NavLink></li>
            <li><NavLink to="/users">Vendors</NavLink></li>
          </div>
          <div className="right-nav-items">
            {!this.props.loggedInUser && <li><NavLink to="/login">Log in</NavLink></li>}
            {this.props.loggedInUser && <li><NavLink to="/" onClick={this.handleOnLogout}>Log out</NavLink></li>}
            {this.props.loggedInUser && 
              <li>
                <NavLink to="/inbox">
                  <b><span><img id="my-messages-icon" src={process.env.PUBLIC_URL + '/assets/images/icons/my-messages.png'}/></span> My Messages</b>
                </NavLink>
              </li>
            }
          </div>
        </ul>
        
      </div>
    );
  }
}

export default Navbar;
