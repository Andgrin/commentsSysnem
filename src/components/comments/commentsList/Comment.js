import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { deleteComment, triggerCommentForm } from '../../../actions';
import axios from 'axios';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReplyComment from './ReplyComment';
import NestedList from './NestedList';


class Comment extends Component {
   constructor(props) {
      super(props);

      // This binding is necessary to make `this` work in the callback
      this.handleReplyClick = this.handleReplyClick.bind(this);
      this.handleEditClick = this.handleEditClick.bind(this);
      this.hendleDeleteComment = this.hendleDeleteComment.bind(this);
   }

   static propTypes = {
      userEmail: PropTypes.string,
      showCommentForm: PropTypes.object
   }

   handleReplyClick = () => {
      this.showReplyOrEditForm('reply', '');
   }

   handleEditClick = () => {
      this.showReplyOrEditForm('edit', this.props.dataItem.content);
   }

   handleCloseClick = () => {
      this.hideCommentForm();
   }

   // AJAX request on delete comment
   hendleDeleteComment() {
      axios({
         method: 'DELETE',
         url: 'http://frontend-test.pingbull.com/pages/' + this.props.userEmail + '/comments/' + this.props.dataItem.id,
         data: {
            _method: 'DELETE'
        }
      })
         .then( response => {
            this.props.deleteComment(this.props.keyNumb)
         })
         .catch(function (error) {
            console.log("AXIOS Error :-S", error);
         });
   }

   //   Show REPLY, EDIT or hide form
   showReplyOrEditForm(type, val) {
      var obj = {
         parentId: this.props.dataItem.id,
         parentKey: this.props.keyNumb,
      };
      
      if (this.props.showCommentForm.type === '' ) {
         obj.type = type;
         obj.value = val;
         this.props.triggerCommentForm(obj);
      } 
      else {
         if (this.props.showCommentForm.type !== type) {
            obj.type = type;
            obj.value = val;
            this.props.triggerCommentForm(obj);
         } else {
            this.hideCommentForm();
         } 
      }
   }

   hideCommentForm() {
      let emptyObj = {type: ''};
      this.props.triggerCommentForm(emptyObj);
   }

   render() {
      const item = this.props.dataItem;     

      return(
         <li className="list-item list-item_comment">
            <div className="comment">
               <div className="user-avatar">
                  <div className="avatar-wraper">
                     <img src={item.author.avatar} alt="" />
                  </div>
               </div>

               <div className="comment-body">
                  <div className="comment-content">
                     <div className="comment-content__header">
                        <span className="comment-content__author header-cell" >
                           <strong>{item.author.name}</strong>
                        </span>
                        <time className="comment-content__publish-time header-cell">
                           <FontAwesomeIcon icon={['far', 'clock']} flip="horizontal" />
                           <strong>{format(item.author.updated_at, 'YYYY-DD-MM')}</strong> 
                           &nbsp;at&nbsp;
                           <strong>{format(item.author.updated_at, 'HH:mm')}</strong>
                        </time>
                     </div>

                     <p className="comment-message">{item.content}</p>

                     <div className="comment-controls">
                        { (this.props.userId === item.author.id) ?
                           <button 
                              className="btn control-btn" 
                              type="buttom" 
                              onClick={ this.handleEditClick } 
                           >
                              <FontAwesomeIcon icon={['far', 'edit']} /> Edit
                           </button> 
                           : null 
                        }
                        { (this.props.userId === item.author.id) ? 
                           <button 
                              className="btn control-btn" 
                              type="buttom" 
                              onClick={ this.hendleDeleteComment } 
                           >
                              <FontAwesomeIcon icon={['fas', 'times']} /> Delete
                           </button> 
                           : null 
                        }
                        <button 
                           className="btn control-btn" 
                           type="buttom" 
                           onClick={ this.handleReplyClick } 
                        >
                           <FontAwesomeIcon icon={['fas', 'reply']} /> Reply
                        </button> 
                     </div>                     
                  </div>
               </div>
            </div>
            
            { ( this.props.showCommentForm.type !== '' && this.props.showCommentForm.parentId === this.props.dataItem.id) ? 
               <ReplyComment 
                  author={this.props.dataItem.author.name} 
                  type={this.props.showCommentForm.type} 
                  onChange={this.handleCloseClick} 
               /> 
               : null
            }

            { ( item.children && item.children.length > 0 ) ? 
               <NestedList 
                  children={item.children}  
                  author={item.author.name} 
               />  
               : null 
            }
         </li>
      )
   }
}

const mapStateToProps = state => {
   return {
      userId: state.userId,
      userEmail: state.userEmail,
      showCommentForm: state.showCommentForm
   }
};

const mapDispatchToProps = (dispatch, data) => {
   return {
      deleteComment: (data) => {
         dispatch(deleteComment(data));
      },
      triggerCommentForm: (data) => {
         dispatch(triggerCommentForm(data));
      }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comment);
