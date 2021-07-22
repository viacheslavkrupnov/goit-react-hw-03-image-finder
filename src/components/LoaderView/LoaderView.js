import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './LoaderView.module.css';

class LoaderView extends Component {
  //other logic
  render() {
    return (
      <Loader
        className={s.loader}
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000}
      />
    );
  }
}

export default LoaderView;
