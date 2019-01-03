import * as React from 'react';

import './styles.css';

import { User } from 'src/shared/models/user.model';
import UserCard, { Color, Size } from '../../components/UserCard/UserCard';

interface DefaultProps { 
  users: User[]
  onUserClick: (user: User) => void 
}

class UserListPage extends React.Component<DefaultProps, object> {

  handleUserClick = (user: User) => {
    this.props.onUserClick(user);
  }
    
  public render() {
    const userCards = this.props.users.map(user => {
      return <div className="col-sm-3" key={user.id}>
              <UserCard 
                user={user}
                onClick={this.handleUserClick}
                color={Color.Gray}
                borderless={false}
                hoverable={true}
                size={Size.Small}
                displayName={true}
                changeBackgroundColorOnHover={true}
              />
            </div>
    });

    return (
      <div className="UserList">
        <div className="container">
          <div className="row">{userCards}</div>
        </div>
      </div>
    );
  }
}

export default UserListPage;
