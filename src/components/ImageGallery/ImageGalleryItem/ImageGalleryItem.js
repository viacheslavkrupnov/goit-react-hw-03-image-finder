import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
// import Modal from '../../Modal';

class ImageGalleryItem extends Component {
  // state = {
  //   showModal: false,
  // };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  render() {
    const { src, alt, toggleModal } = this.props;
    // const { showModal } = this.state;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          src={src}
          alt={alt}
          className={s.ImageGalleryItem_image}
          onClick={toggleModal}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  // largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
