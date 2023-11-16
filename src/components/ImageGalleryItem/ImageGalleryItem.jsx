import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    modalShown: false,
  };

  handleModal = () => {
    console.log('handleModal called');
    this.setState(prevState => ({ modalShown: !prevState.modalShown }));
  };

  render() {
    const { item } = this.props;

    return (
      <li className={css.galleryItem}>
        <img
          src={item.webformatURL}
          alt={item.tags}
          className={css.image}
          onClick={this.handleModal}
        />
        {this.state.modalShown && (
          <Modal item={item} onClose={this.handleModal} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
