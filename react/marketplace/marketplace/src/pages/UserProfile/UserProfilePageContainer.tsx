import * as React from 'react';

import routerHistory from '../../shared/router-history/router-history';

import UserProfilePage from './UserProfilePage';
import LoadingPage from '../Loading/LoadingPage';

import { Product } from 'src/shared/models/product.model';
import { getIdFromURL } from 'src/shared/utils/url.util';
import { getUser } from 'src/core/modules/user.module';
import { User } from 'src/shared/models/user.model';

interface DefaultProps { }
interface DefaultState { 
  profileUser: User | null
}

class UserProfilePageContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      profileUser: null
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
  }
    
  public render() {
    if (!this.state.profileUser) {
      return <LoadingPage />
    }
    
    return (<UserProfilePage 
            handleProductclick={this.handleProductClick}
            profileUser={this.state.profileUser}
            />);
  }
}

export default UserProfilePageContainer

