import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import ImagesInfo from './components/ImagesInfo';
import Container from './components/Container';
import Searchbar from './components/Searchbar';

class App extends Component {
  state = {
    imageName: '',
  };

  handelFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handelFormSubmit} />

        <ImagesInfo imageName={this.state.imageName} />
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
