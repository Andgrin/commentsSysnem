import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NewComment from './NewComment';
import CommentsList from './commentsList/CommentsList';
import LoadMoreComments from './LoadMoreComments'
import { getCommentsList, checkCanLoadMore } from '../../actions/index';
import axios from 'axios';
import '../../styles/Comments.css'

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
      this.axiosFetch();
   }

   axiosFetch(){
      axios({
         method: 'get',
         url: 'http://frontend-test.pingbull.com/pages/' + this.props.userEmail + '/comments',
         data: {
            count: 5,
            offset: this.props.lastLoadedCommentNumb
         }
      })
         .then( response => {
            this.props.getCommentsList(response.data);
            this.checkCanLoadMore(response.data);
         })
         .catch(function (error) {
            console.log("AXIOS Error :-S", error);
         });
   }

   checkCanLoadMore(data) {
      if ( data.length % 5 === 0 ) {
         this.props.checkCanLoadMore(true);
      } else {
         this.props.checkCanLoadMore(false);
      }
   }

   // Handle click Load More Comments
   handleClick() {
      this.axiosFetch();
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
