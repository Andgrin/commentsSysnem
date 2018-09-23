import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NewComment from './NewComment';
import CommentsList from './commentsList/CommentsList';
import LoadMoreComments from './LoadMoreComments'
import { getCommentsList, checkCanLoadMore } from '../../actions/index';
// import axios from 'axios';
import '../../styles/Comments.css'

import callFatch from '../../api/ajaxRequests';

class CommentsSystem extends Component {
  constructor(props) {
    super(props);
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    comments: PropTypes.array,
    lastLoadedCommentNumb: PropTypes.number,
    canLoadMore: PropTypes.bool,
    userEmail: PropTypes.string,
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments() {
    let offset = this.props.lastLoadedCommentNumb;
    const successFunc = data => {
      this.props.getCommentsList(data);
      this.checkCanLoadMore(data);
    }

    callFatch('loadComments', {
      data: {
        count: 5,
        offset: offset
      },
      callback: successFunc
    })
  }

  checkCanLoadMore(data) {
    if ( data ) {
      if ( data.length !== 0 && data.length % 5 === 0 ) {
        console.log('checkCanLoadMore true', data.length, this.props.lastLoadedCommentNumb);
        this.props.checkCanLoadMore({
          canLoadMore: true,
          numb: this.props.lastLoadedCommentNumb + data.length 
        });
      } else {
        console.log('checkCanLoadMore else', data.length, this.props.lastLoadedCommentNumb);
        this.props.checkCanLoadMore({
          canLoadMore: false,
          numb: this.props.lastLoadedCommentNumb + data.length 
        });
      }
    }
  }

  // Handle click Load More Comments
  handleClick() {
    this.loadComments();
  }

  render() {
    const comments = this.props.comments;

    return (
      <div id="commentsSystem" className="comments-system">
        <NewComment />
        { ( comments.length > 0 ) ? <CommentsList /> : null }

        { (this.props.canLoadMore) ? <LoadMoreComments onChange={this.handleClick}  /> : null }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    comments: state.comments,
    lastLoadedCommentNumb: state.lastLoadedCommentNumb,
    canLoadMore: state.canLoadMore,
    userEmail: state.userEmail,
  }
}

const mapDispatchToProps = (dispatch, data) => {
  return {
    getCommentsList: (data) => {
        dispatch(getCommentsList(data));
    },
    checkCanLoadMore: (data) => {
        dispatch(checkCanLoadMore(data));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentsSystem);
