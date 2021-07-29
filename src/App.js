import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Searchbar from './components/Searchbar';

import pixabayAPI from './services/apiPixabay';
import ImagesErrorView from './components/ImagesErrorView';
import LoaderView from './components/LoaderView';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    arePicturesOver: false,
    totalHits: 0,

    showModal: false,
    largeURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
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
    const { imageName } = this.state;
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

  handelFormSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleModal = largeURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeURL,
    }));
  };

  render() {
    const { error, status, arePicturesOver, images, showModal } = this.state;
    const { alt } = this.props;

    return (
      <Container>
        <Searchbar onSubmit={this.handelFormSubmit} />
        <ToastContainer autoClose={3000} />

        {status === Status.IDLE && (
          <p>Please enter a value for search images</p>
        )}

        {status === Status.PENDING && <LoaderView />}

        {status === Status.REJECTED && (
          <ImagesErrorView message={error.message} />
        )}

        {status === Status.RESOLVED && (
          <>
            <ImageGallery toggleModal={this.toggleModal} images={images} />

            {showModal && (
              <Modal
                onClose={this.toggleModal}
                src={this.state.largeURL}
                alt={alt}
              />
            )}

            {status === Status.RESOLVED && !arePicturesOver && (
              <Button onLoadMore={this.onLoadMore} />
            )}
          </>
        )}
      </Container>
    );
  }
}

export default App;
