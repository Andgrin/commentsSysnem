import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddCommentForm from '../AddCommentForm';

class ReplyComment extends Component {

   static propTypes = {
      onChange: PropTypes.func.isRequired
   }

   render() {
      return(
         <div className="comment-reply">
            <div className="comment-reply__head">
               <span className="reply-to__author">
                  <FontAwesomeIcon icon={['fas', 'reply']} flip="horizontal" /> {this.props.author}
               </span>

               <button type="button" className="btn reply-btn__cancel" onClick={this.props.onChange} >
                  <FontAwesomeIcon icon={['fas', 'times']} /> Cancel
               </button>
            </div>

            <AddCommentForm parentKey={this.props.parentKey} parentId={this.props.parentId} text={this.props.text} />
         </div>
      )
   }
}

export default ReplyComment;
