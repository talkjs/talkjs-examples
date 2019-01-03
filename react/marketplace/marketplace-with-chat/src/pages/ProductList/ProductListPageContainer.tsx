import * as React from 'react';

import { Product } from 'src/shared/models/product.model';

import routerHistory from '../../shared/router-history/router-history';

import ProductListpage from './ProductListPage';
import { getProducts } from 'src/core/modules/product.module';

interface DefaultProps { }
interface DefaultState {
  products: Product[]
}

class ProductPageListContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      products: []
    }
  }

  handleProductClick = (product: Product) => {
    routerHistory.push('/products/' + product.id);
  }

  async componentDidMount() {
    this.setState({
      products: await getProducts()
    });
  }
    
  public render() {
    return (<ProductListpage 
             onProductClick={this.handleProductClick}
             products={this.state.products}
            />);
  }
}

export default ProductPageListContainer;

