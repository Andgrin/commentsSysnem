import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Comment from './Comment';


class CommentList extends Component {

  static propTypes = {
    comments: PropTypes.array
  }

  render() {
    const comments = this.props.comments;

    return (
      <ul className="comments-list">
        {comments.map( (item, index) => {
          return (
            <Comment dataItem={item} keyNumb={index} key={index} />
          )
        })}
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
