import * as React from 'react';

import HomePage from './HomePage';

import routerHistory from '../../shared/router-history/router-history';

import { Product } from 'src/shared/models/product.model';
import { User } from 'src/shared/models/user.model';

import { getTopProducts } from 'src/core/modules/product.module';
import { getTopUsers } from 'src/core/modules/user.module';

interface DefaultState {
  topProducts: Product[],
  topVendors: User[]
}
interface DefaultProps { }

class HomePageContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      topProducts: [],
      topVendors: []
    };
  }

  handleTopProductClick = (product: Product) => {
    routerHistory.push('/products/' + product.id);
  }

  handleTopVendorClick = (vendor: User) => {
    routerHistory.push('/users/' + vendor.id);
  }

  async componentDidMount() {
    this.setState({
      topProducts: await getTopProducts(),
      topVendors: await getTopUsers()
    })
  }
    
  public render() {
    return (<HomePage
             onTopProductClick={this.handleTopProductClick}
             onTopVendorClick={this.handleTopVendorClick}
             topProducts={this.state.topProducts}
             topVendors={this.state.topVendors}
            />);
  }
}

export default HomePageContainer;
