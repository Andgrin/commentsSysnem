import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SendComment from './sendCommentForm/SendComment';


class NewComment extends Component {

   static propTypes = {
      userAvatarSrc: PropTypes.string,
   }

   render() {
      return (
         <div id="newComment" className="new-comment">
            <div className="new-comment__title">
               <h1>Leave comment:</h1>
            </div>

            <div className="new-comment__body">
               <div className="new-comment__avatar user-avatar">
                  <div className="avatar-wraper">
                     <img src={this.props.userAvatarSrc} alt="" />
                  </div>
               </div>

               <SendComment parentKey={0}  />
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      userAvatarSrc: state.userAvatarSrc,
   }
}


export default connect(mapStateToProps)(NewComment);
