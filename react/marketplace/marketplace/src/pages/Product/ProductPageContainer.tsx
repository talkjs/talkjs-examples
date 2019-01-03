import * as React from 'react';

import { User } from 'src/shared/models/user.model';

import routerHistory from '../../shared/router-history/router-history';

import ProductPage from './ProductPage';
import LoadingPage from '../Loading/LoadingPage';

import { getIdFromURL } from 'src/shared/utils/url.util';
import { getProduct } from 'src/core/modules/product.module';
import { Product } from 'src/shared/models/product.model';

interface DefaultProps { }
interface DefaultState { 
  product: Product | null
}

class ProductPageContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      product: null
    }
  }

  handleIncorrectIdParameter() {
    routerHistory.replace('/404');
  }

  handleVendorClick = (vendor: User) => {
    routerHistory.push('/users/' + vendor.id);
  }

  async componentDidMount() {
    /* Product Page Product Loading */
    const productId = getIdFromURL('/products/');

    if (!productId) {
      this.handleIncorrectIdParameter();
      return;
    }

    const product = await getProduct(productId);

    this.setState({
        product: product
    });
  }

  public render() {
    if (!this.state.product) {
      return <LoadingPage />;
    }

    return (<ProductPage 
             onVendorClick={this.handleVendorClick}
             product={this.state.product}
            />);
  }
}

export default ProductPageContainer;


