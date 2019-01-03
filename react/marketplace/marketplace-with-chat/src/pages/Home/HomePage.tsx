import * as React from 'react';

import { Alert }  from 'react-bootstrap';

import './styles.css';

import { Product } from 'src/shared/models/product.model';
import { User } from 'src/shared/models/user.model';
import ProductCard, { Size as ProductCardSize } from '../../components/ProductCard/ProductCard';
import UserCard, { Color, Size as UserCardSize } from '../../components/UserCard/UserCard';

interface DefaultProps {
  topProducts: Product[],
  topVendors: User[],
  onTopProductClick: (product: Product) => void,
  onTopVendorClick: (vendor: User) => void
}

interface DefaultState { 
  shouldDisplayAlert: boolean
}

class HomePage extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      shouldDisplayAlert: true
    };
  }

  handleTopProductClick = (product: Product) => {
    this.props.onTopProductClick(product);
  }

  handleTopVendorClick = (user: User) => {
    this.props.onTopVendorClick(user);
  }

  handleAlertDismiss = () => {
    this.setState({
        shouldDisplayAlert: false
    });
  }
    
  public render() {
    const topProductCards = this.props.topProducts.map(product => {
      return <ProductCard 
              key={product.id}
              product={product}
              onClick={this.handleTopProductClick}
              size={ProductCardSize.Small}
              hoverable={true}
              softEdges={false}
             />
    });
    const topVendorCards = this.props.topVendors.map(vendor => {
      return <UserCard
                key={vendor.id} 
                user={vendor}
                onClick={this.handleTopVendorClick}
                size={UserCardSize.Small}
                color={Color.Transparent}
                borderless={true}
                hoverable={true}
                displayName={true}
                changeBackgroundColorOnHover={true}
                />
    });

    return (
      <div className="Home">
        <div id="top-products-container" className="container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              {this.state.shouldDisplayAlert && 
              <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
                <p>
                  This demo application has been made for a <a className="bold-warning" href="https://talkjs.com/tutorials/article/integrate-buyer-seller-chat-into-a-marketplace-with-react/">tutorial</a> on how to implement <a className="bold-warning" href="http://www.talkjs.com">TalkJS</a> into any React application.
                </p>  
                <p>
                  Try chatting with Mary!
                </p>
              </Alert>}
            </div>
            <div className="col-sm-4"></div>
          </div>

          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 container-title">Top Products</div>
            <div className="col-sm-4"></div>
          </div>

          <div id="top-products-row" className="card-deck">
            <div className="card invisible-card"></div>
            {topProductCards}
            <div className="card invisible-card"></div>
          </div>
        </div>
        
        <hr className="divider" />

        <div id="top-vendors-container" className="container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 container-title" id="top-vendor-title">Top Vendors</div>
            <div className="col-sm-4"></div>
          </div>
          <div id="top-vendors-row" className="card-deck">
            <div className="card invisible-card"></div>
            {topVendorCards}
            <div className="card invisible-card"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
