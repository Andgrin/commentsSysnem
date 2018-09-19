import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Comment from './Comment';
import axios from 'axios';


class CommentList extends Component {

   static propTypes = {
      comments: PropTypes.array
   }

   // componentDidMount() {
   //    axios.get('http://frontend-test.pingbull.com/pages/andgrin.mb@gmail.com/comments?count=5')
   //       .then(function (response) {
   //          console.log(response);
   //       })
   //       .catch(function (error) {
   //          console.log(error);
   //       });
   // }

   render() {
      const comments = this.props.comments;

      return (
         <ul className="comments-list">
            {comments.map( (item, index) => {
               return (
                  <Comment dataItem={item} keyNumb={index} key={index} />
               )
            } )}
         </ul>
      )
   }
}

const mapStateToProps = state => {
   return {
      comments: state.comments
   }
}

export default connect(mapStateToProps)(CommentList);
