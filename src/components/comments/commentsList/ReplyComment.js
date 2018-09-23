import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SendComment from '../sendCommentForm/SendComment';
import EditComment from '../sendCommentForm/EditComment';


const ReplyComment = ({
  type,
  author,
  onChange,
}) => (
  <div className="comment-reply">
    <div className="comment-reply__head">
        <span className="reply-to__author">
          { (type === 'reply') ? 
            <span>
              <FontAwesomeIcon icon={['fas', 'reply']} flip="horizontal" /> {author}
            </span> 
            : null 
          }
        </span>

        <button type="button" className="btn reply-btn__cancel" onClick={onChange} >
          <FontAwesomeIcon icon={['fas', 'times']} /> Cancel
        </button>
    </div>

    {
      (type === 'reply') ?
      <SendComment /> :
      <EditComment />
    }
  </div>
)

ReplyComment.propTypes = {
  onChange: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default ReplyComment;
