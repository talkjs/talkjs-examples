import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { User } from 'src/shared/models/user.model';

import routerHistory from '../../shared/router-history/router-history';

import ProductPage from './ProductPage';
import LoadingPage from '../Loading/LoadingPage';

import { getIdFromURL } from 'src/shared/utils/url.util';
import { getProduct } from 'src/core/modules/product.module';
import { Product } from 'src/shared/models/product.model';

import Talk from 'talkjs';
import * as talkSession from '../../shared/talk/talk-session';
import { getOrCreateConversation } from 'src/shared/utils/talk.util';

interface DefaultProps { currentUser: User }
interface DefaultState { 
  product: Product | null,
  talkSession: Talk.Session | null,
  talkConversation: Talk.ConversationBuilder | null
}

class ProductPageContainer extends React.Component<DefaultProps, DefaultState, object> {

  constructor(props: any) {
    super(props);

    this.state = {
      product: null,
      talkSession: null,
      talkConversation: null
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

    /* TalkJS */
    const session = await talkSession.get();
    const conversation = await getOrCreateConversation(session, this.props.currentUser, product.vendor);

    this.setState({
      talkSession: session,
      talkConversation: conversation
    });
  }

  public render() {
    if (!this.state.product) {
      return <LoadingPage />;
    }

    return (<ProductPage 
             onVendorClick={this.handleVendorClick}
             product={this.state.product}
             talkSession={this.state.talkSession}
             talkConversation={this.state.talkConversation}
            />);
  }
}

const mapStateToProps = (state: any, props: any) => {
  return { currentUser: state.authentication.currentUser };
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer);


