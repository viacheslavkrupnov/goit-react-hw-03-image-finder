import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pixabayAPI from '../../services/apiPixabay';
import ImagesErrorView from '../ImagesErrorView/ImagesErrorView';
import LoaderView from '../LoaderView/LoaderView';
import ImageGallery from '../ImageGallery';
import Button from '../Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImagesInfo extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    arePicturesOver: false,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({
        page: 1,
        images: [],
        error: null,
        status: Status.IDLE,
      });

      this.fetchImage(1);
    }
    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchImage(nextPage);
    }
  }

  fetchImage = page => {
    const { imageName } = this.props;
    this.setState({ status: Status.PENDING });

    pixabayAPI
      .fetchPixabay(imageName, page)
      .then(newImages => {
        if (newImages.total !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages.hits],
            arePicturesOver: newImages.totalHits - page * 12 <= 0,

            status: Status.RESOLVED,
          }));
          return window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }

        return Promise.reject(new Error('Invalid request'));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { error, status, arePicturesOver, images } = this.state;

    if (status === Status.IDLE) {
      return <p>Please enter a value for search images</p>;
    }

    if (status === Status.REJECTED) {
      return <ImagesErrorView message={error.message} />;
    }

    if (status === Status.RESOLVED || status === Status.PENDING) {
      return (
        <>
          <ImageGallery images={images} />

          {status === Status.RESOLVED && !arePicturesOver && (
            <Button onLoadMore={this.onLoadMore} />
          )}
          {status === Status.PENDING && <LoaderView />}
        </>
      );
    }
  }
}

ImagesInfo.propTypes = {
  imageName: PropTypes.string.isRequired,
};
