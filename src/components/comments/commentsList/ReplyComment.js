import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SendComment from '../sendCommentForm/SendComment';
import EditComment from '../sendCommentForm/EditComment';


class ReplyComment extends Component {
   render() {
      return(
         <div className="comment-reply">
            <div className="comment-reply__head">
               <span className="reply-to__author">
                  { (this.props.type === 'perly') ? 
                     <spsn><FontAwesomeIcon icon={['fas', 'reply']} flip="horizontal" /> {this.props.author}</spsn> 
                     : null 
                  }
               </span>

               <button type="button" className="btn reply-btn__cancel" onClick={this.props.onChange} >
                  <FontAwesomeIcon icon={['fas', 'times']} /> Cancel
               </button>
            </div>

            {
               (this.props.type === 'reply') ?
               <SendComment /> :
               <EditComment />
            }
         </div>
      )
   }
}

export default ReplyComment;
