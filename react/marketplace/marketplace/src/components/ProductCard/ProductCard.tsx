import * as React from 'react';

import classNames from 'classnames';

import './styles.css';

import { Product } from 'src/shared/models/product.model';

interface DefaultProps { 
    product: Product,
    size: Size,
    hoverable: boolean,
    softEdges: boolean,
    onClick?: (product: Product) => void
}

export enum Size {
    Extra_Small = 'extra-small',
    Small = 'small',
    Large = 'large'
}

class ProductCard extends React.Component<DefaultProps, object> {

  handleClick = () => {
    if (this.props.onClick) {
        this.props.onClick(this.props.product);
    }
  }
    
  public render() {
    const product = this.props.product;
    
    const cardClass = classNames({
        'card': true,
        'product-card': true,
        'hoverable': this.props.hoverable,
        [`${this.props.size}` + '-product-card']: true
    });
    const imageClass = classNames({
        'card-img-top': true,
        'img-fluid': true,
        [`${this.props.size}` + '-image']: true,
        'soft-edges': this.props.softEdges,
        'mx-auto': true,
        'd-block': true,
    });

    return (
        <div className="ProductCard">
            <div className={cardClass} onClick={this.handleClick}>
                <img className={imageClass} src={product.pictureUrl}  alt="product-image" />
                <div className="card-block">
                    <h4 className="card-title" id="product-card-title">{product.name}</h4>
                    {this.props.size === Size.Large && 
                        <h5 className="card-title" id="product-card-title">&euro;	{product.price}</h5>
                    }
                </div>
            </div>
        </div>
    );
  }
}

export default ProductCard;
