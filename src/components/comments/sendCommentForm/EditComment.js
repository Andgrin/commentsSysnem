import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { editComment, triggerCommentForm } from '../../../actions';
import axios from 'axios';
import CommentForm from './CommentForm';

class EditComment extends Component {

   static propTypes = {
      userEmail: PropTypes.string,
      showCommentForm: PropTypes.object
   }

   // AJAX request 
   postEditedComment(commentText) {
      axios({
         method: 'PUT',
         url: 'http://frontend-test.pingbull.com/pages/' + this.props.userEmail + '/comments/' + this.props.showCommentForm.parentId,
         data: {
            _method: 'PUT',
            content: commentText
         }
      })
         .then( response => {
            this.props.editComment({
               comment:response.data.content, 
               id: this.props.showCommentForm.parentKey
            });

            const hideForm = {}; // return empty obj
            this.props.triggerCommentForm(hideForm);
         })
         .catch(function (error) {
            console.log("AXIOS Error :-S", error);
         });
   }

   handleClick = value => {
      this.postEditedComment(value);
   }

   render() {
      return (
         <div className="send-comment-form">
            <CommentForm onChange={this.handleClick} text={this.props.showCommentForm.value} />
         </div>
      )
   }
}


const mapStateToProps = state => {
   return {
      userEmail: state.userEmail,
      showCommentForm: state.showCommentForm
   }
}

const mapDispatchToProps = (dispatch, data) => {
   return {
      editComment: (data) => {
         dispatch(editComment(data));
      },
      triggerCommentForm: (data) => {
         dispatch(triggerCommentForm(data));
      }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
