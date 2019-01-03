import * as React from 'react';

import './styles.css';

import * as Talk from 'talkjs';

import { User } from 'src/shared/models/user.model';
import UserCard, { Color, Size as UserCardSize } from '../../components/UserCard/UserCard';
import ProductCard, { Size as ProductCardSize } from '../../components/ProductCard/ProductCard';
import { Product } from 'src/shared/models/product.model';
import Chatbox from '../../components/Chatbox/Chatbox'; 

interface DefaultProps { 
  profileUser: User,
  talkSession: Talk.Session | null,
  talkConversation: Talk.ConversationBuilder | null,
  handleProductclick: (product: Product) => void
}

class UserProfilePage extends React.Component<DefaultProps, object> {

  handleProductClick = (product: Product) => {
    this.props.handleProductclick(product);
  }
    
  public render() {
    const user = this.props.profileUser;

    const productCards = user.products.map(product => {
      return <div className="col-sm-3" key={product.id}>
              <ProductCard
                product={product}
                size={ProductCardSize.Extra_Small}
                hoverable={true}
                softEdges={false}
                onClick={this.handleProductClick}
              />
             </div>
    });

    return (
      <div className="UserProfile">
        <div id="personal-information-container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <UserCard 
                user={user}
                color={Color.Gray}
                borderless={false}
                hoverable={false}
                size={UserCardSize.Large}
                displayName={true}
                changeBackgroundColorOnHover={false}
              />
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>

        <hr className="divider" />

        <div id="chat-container">
          <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4 container-title">Chat</div>
                <div className="col-sm-4"></div>
          </div>
          <div id="talkjs-chatbox">
            <Chatbox 
              loadingMessage='Loading chat...'
              height={505}
              session={this.props.talkSession}
              conversation={this.props.talkConversation}
            />
          </div>
         </div>

        <hr className="divider" />

        <div id="owned-products-container" className="container">
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 container-title">Products</div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row" id="products-row">
            {productCards}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;
