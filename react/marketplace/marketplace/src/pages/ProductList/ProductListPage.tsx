import * as React from 'react';

import './styles.css';

import { Product } from 'src/shared/models/product.model';
import ProductCard, { Size } from '../../components/ProductCard/ProductCard';

interface DefaultProps { 
  products: Product[]
  onProductClick: (product: Product) => void 
}

class ProductListPage extends React.Component<DefaultProps, object> {

  handleProductClick = (product: Product) => {
    this.props.onProductClick(product);
  }
    
  public render() {
    const productCards = this.props.products.map(product => {
      return <div className="col-sm-3" key={product.id}>
              <ProductCard 
                product={product} 
                onClick={this.handleProductClick}
                size={Size.Extra_Small}
                hoverable={true}
                softEdges={false}
              />
            </div>
    });

    return (
      <div className="ProductList"> 
        <div className="container">
          <div className="row">{productCards}</div>
        </div>
      </div>
    );
  }
}

export default ProductListPage;
