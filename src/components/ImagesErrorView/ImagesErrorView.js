import PropTypes from 'prop-types';

function ImagesErrorView({ message }) {
  return (
    <div role="alert">
      <p>Sorry, something went wrong. Error image</p>
    </div>
  );
}

ImagesErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ImagesErrorView;
