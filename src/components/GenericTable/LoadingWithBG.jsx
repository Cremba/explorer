import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading.jsx';
import './LoadingWithBG.css';

export default function LoadingWithBG(props) {
  if (!props.loading) return null;

  return (
    <div className="LoadingWithBG">
      <div className="loading-bg" />
      <div className="loading-fg d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    </div>
  );
}

LoadingWithBG.propTypes = {
  loading: PropTypes.bool,
};
