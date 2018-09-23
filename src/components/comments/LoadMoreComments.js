import React from 'react';
import PropTypes from 'prop-types';


const LoadMoreComments = ({
  onChange,
  }) => (
    <div className="load-more-comments">
      <div className="load-more_button-wrapper">
        <button
          type="button"
          className="btn load-more__btn"
          onClick={onChange}
        >
          load more comments
        </button>
      </div>
    </div>
  )

LoadMoreComments.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default LoadMoreComments;
