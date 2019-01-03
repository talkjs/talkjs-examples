import * as React from 'react';

import './styles.css';

import { Product } from 'src/shared/models/product.model';
import ProductCard, { Size as ProductCardSize } from '../../components/ProductCard/ProductCard';
import UserCard, { Color, Size as UserCardSize } from '../../components/UserCard/UserCard';
import { User } from 'src/shared/models/user.model';

interface DefaultProps { 
  product: Product,
  onVendorClick: (vendor: User) => void
}

class ProductPage extends React.Component<DefaultProps, object> {

  handleVendorClick = (vendor: User) => {
    this.props.onVendorClick(vendor);
  }
    
  public render() {
    const product = this.props.product;

    return (
      <div className="ProductPage">  
        <div id="product-information-container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <ProductCard 
               product={product}
               size={ProductCardSize.Large}
               hoverable={false}
               softEdges={true}
              />
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>

        <hr className="divider"></hr>

        <div id="vendor-information-container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 container-title">Vendor</div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <UserCard 
               user={product.vendor}
               color={Color.Gray}
               borderless={false}
               onClick={this.handleVendorClick}
               hoverable={true}
               size={UserCardSize.Large}
               displayName={false}
               useBottomMarginForImage={true}
               changeBackgroundColorOnHover={false}
              />
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
