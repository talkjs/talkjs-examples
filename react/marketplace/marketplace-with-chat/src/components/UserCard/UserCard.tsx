import * as React from 'react';

import classNames from 'classnames';

import './styles.css';

import { User } from 'src/shared/models/user.model';

interface DefaultProps { 
  user: User,
  size: Size,
  color: Color,
  borderless: boolean,
  hoverable: boolean,
  changeBackgroundColorOnHover: boolean,
  displayName: boolean,
  useBottomMarginForImage?: boolean,
  onClick?: (user: User) => void
}

export enum Color {
  Gray = 'gray',
  Transparent = 'transparent'
}

export enum Size {
  Small = 'small',
  Large = 'large'
}

class UserCard extends React.Component<DefaultProps, object> {

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.user);
    }
  }
    
  public render() {
    const user = this.props.user;

    const cardClass = classNames({
      'card': true,
      'user-card': true,
      [`${this.props.size}` + '-user-card']: true,
      [`${this.props.color}`]: true,
      'borderless': this.props.borderless,
      'hoverable-card': this.props.hoverable,
      ['hoverable-' + `${this.props.color}`]: this.props.changeBackgroundColorOnHover
    });
    const imageClass = classNames({
      'card-img-top': true,
      'user-card-img-top': true,
      'img-fluid': true,
      'mx-auto': true,
      'd-block': true,
      [`${this.props.size}` + '-img']: true,
      'bottom-margin-image': this.props.useBottomMarginForImage
    });

    return (
      <div className="UserCard">
        <div className={cardClass} onClick={this.handleClick}>
            <img className={imageClass} src={user.profilePictureUrl} alt="vendor-profile-picture" />
            <div className="card-block">
            {this.props.displayName && 
              <h4 className="card-title user-card-title">{user.username}</h4>
            }
            </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
