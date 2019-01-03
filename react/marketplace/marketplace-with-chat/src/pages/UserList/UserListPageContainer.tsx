import * as React from 'react';

import { User } from 'src/shared/models/user.model';

import routerHistory from '../../shared/router-history/router-history';

import UserListPage from './UserListPage';
import { getUsers } from 'src/core/modules/user.module';

interface DefaultProps { }
interface DefaultState { users: User[] } 

class UserListPageContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      users: []
    };
  }

  handleUserClick = (user: User) => {
    routerHistory.push('/users/' + user.id);
  }

  async componentDidMount() {
    this.setState({
      users: await getUsers()
    });
  }
    
  public render() {
      return (<UserListPage 
               onUserClick={this.handleUserClick}
               users={this.state.users}
              />);
  }
}

export default UserListPageContainer;

