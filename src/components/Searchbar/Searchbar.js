import { Component } from 'react';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handelFormSubmit = e => {
    e.preventDefault();

    const { imageName } = this.state;

    if (imageName.trim() === '') {
      return toast.info('Please enter search query');
    }

    this.props.onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handelFormSubmit}>
          <button type="submit" className={s.SearchFormBtn}>
            <GrSearch />
            {/* <span className={s.SearchForm_button_label}>Search</span> */}
          </button>

          <input
            value={this.state.imageName}
            onChange={this.handleNameChange}
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
