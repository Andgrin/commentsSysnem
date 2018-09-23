import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { editComment, triggerCommentForm } from '../../../actions';
// import axios from 'axios';
import CommentForm from './CommentForm';
import callFatch from '../../../api/ajaxRequests';

class EditComment extends Component {

  static propTypes = {
    userEmail: PropTypes.string,
    showCommentForm: PropTypes.object
  }

   // AJAX request 
  postEditedComment(commentText) {
    const url = this.props.showCommentForm.parentId;
    const callbackFunc = data => {
      this.props.editComment({
        comment:data.content, 
        id: this.props.showCommentForm.parentKey
      });
  
      const hideForm = {type: ''}; // return empty obj
      this.props.triggerCommentForm(hideForm);
    }
     
    callFatch('newComment', {
      data: {
        content: commentText,
        _method: 'PUT',
      },
      url: url,
      callback: callbackFunc
    })
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
