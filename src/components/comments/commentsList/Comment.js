import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReplyComment from './ReplyComment';
import NestedList from './NestedList';
import { deleteComment } from '../../../actions';
import axios from 'axios';


class Comment extends Component {
   constructor(props) {
      super(props);
      this.state = {
         replyToggleOn: false,
         editText: ""
      };
      // This binding is necessary to make `this` work in the callback
      this.handleReplyClick = this.handleReplyClick.bind(this);
      this.handleEditClick = this.handleEditClick.bind(this);
      this.hendleDeleteComment = this.hendleDeleteComment.bind(this);
   }

   static propTypes = {
      userEmail: PropTypes.string,
   }

   handleReplyClick() {
      this.triggerTextInput();
      this.clearEditText();
   }

   handleEditClick() {
      this.triggerTextInput();
      this.triggerEditText();
   }

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

   triggerTextInput() {
      this.setState(state => ({
         replyToggleOn: !state.replyToggleOn
      }));
   }

   triggerEditText() {
      if (!this.state.replyToggleOn) {
         this.setState(state => ({
            editText: this.props.dataItem.content
         }));
      } else {
         this.setState(state => ({
            editText: ""
         }));
      }
   }

   clearEditText() {
      if (this.state.replyToggleOn) {
         this.setState(state => ({
            editText: ""
         }));
      }
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
            
            { (this.state.replyToggleOn) ? 
               <ReplyComment 
                  text={this.state.editText} 
                  parentKey={this.props.keyNumb}
                  parentId={this.props.dataItem.id}
                  author={this.props.dataItem.author.name} 
                  onChange={this.handleReplyClick} 
               /> 
               : null
            }


            { ( item.children && item.children.length > 0) ? 
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
      userEmail: state.userEmail
   }
};

const mapDispatchToProps = (dispatch, data) => {
   return {
      deleteComment: (data) => {
         dispatch(deleteComment(data));
      }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comment);
