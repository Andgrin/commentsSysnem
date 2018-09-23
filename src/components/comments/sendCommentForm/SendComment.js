import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addNewComment, addNewSubComment, triggerCommentForm } from '../../../actions';
// import axios from 'axios';
import CommentForm from './CommentForm';

import callFatch from '../../../api/ajaxRequests';

class SendComment extends Component {

  static propTypes = {
    userEmail: PropTypes.string,
    showCommentForm: PropTypes.object
  }

   // AJAX request 
  postNewComment(commentText) {
    const parentId = this.props.showCommentForm.parentId || 0
    const callbackFunc = data => {
      if ( data.parent === null || data.parent === 0 ) {
         this.props.addNewComment(data)
      } else {
         this.props.addNewSubComment({
            comment: data, 
            id: this.props.showCommentForm.parentKey})
      }

      const hideForm = {type: ''}; // return empty obj
      this.props.triggerCommentForm(hideForm);
    }
    
    callFatch('newComment', {
      data: {
        content: commentText,
        parent: parentId
      },
      callback: callbackFunc
    })
  }

   // Check comment new or nested, and hide form
  setCommentToStore(data) {
    if ( data.parent === null || data.parent === 0 ) {
      this.props.addNewComment(data)
    } else {
      this.props.addNewSubComment({
        comment: data, 
        id: this.props.showCommentForm.parentKey})
    }

    const hideForm = {type: ''}; // return empty obj
    this.props.triggerCommentForm(hideForm);
  }

  handleClick = value => {
    this.postNewComment(value);
  }

  render() {
    return (
        <div className="send-comment-form">
          <CommentForm onChange={this.handleClick} />
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
    addNewComment: (data) => {
        dispatch(addNewComment(data));
    },
    addNewSubComment: (data) => {
        dispatch(addNewSubComment(data));
    },
    triggerCommentForm: (data) => {
        dispatch(triggerCommentForm(data));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SendComment);
