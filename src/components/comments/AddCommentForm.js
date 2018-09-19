import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addNewComment, addNewSubComment } from '../../actions';
import axios from 'axios';

class AddCommentForm extends Component {

   constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.clearInputValue = this.clearInputValue.bind(this);
   }
  
   static propTypes = {
      value: PropTypes.string,
      userEmail: PropTypes.string,
   }

   postNewComment(commentText) {
      axios({
         method: 'post',
         url: 'http://frontend-test.pingbull.com/pages/' + this.props.userEmail + '/comments',
         data: {
            content: commentText,
            parent: this.props.parentId || 0
         }
      })
         .then( response => {
            console.log("AXIOS response.data   ", response.data);
            this.clearInputValue();
            this.setCommentToStore(response.data);
         })
         .catch(function (error) {
            console.log("AXIOS Error :-S", error);
         });
   }

   setCommentToStore(data) {
      if ( data.parent === 0 ) {
         console.log("NEW", data.parent);
         this.props.addNewComment(data)
      } else {
         console.log("REPLY", this.props.parentKey);
         this.props.addNewSubComment(data, this.props.parentKey)
      }
   }

   handleChange(event) {
      this.setState({value: event.target.value});
   }

   clearInputValue() {
      this.setState({value: ''});
   }

   handleKeyUp = (e) => {
      if (e.keyCode === 13) {
      this.handleGoClick()
      }
   }

   handleGoClick = () => {
      this.postNewComment(this.state.value)
   }

   render() {
      return (
         <div id="" className="new-comment-form">
            <textarea
               className="text-input textarea"
               type="text" 
               size="400"
               ref={ (input) => {this.input = input} } 
               value={this.state.value}
               onKeyUp={this.handleKeyUp}
               onChange={this.handleChange} 
               placeholder="Your Message" 
            >
               {this.props.text}
            </textarea>

            <button 
               className="btn send-btn new-comment-btn"
               onClick={this.handleGoClick} 
            >
               Send
            </button>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      userEmail: state.userEmail,
   }
}

const mapDispatchToProps = (dispatch, data) => {
   return {
      addNewComment: (data) => {
         dispatch(addNewComment(data));
      },
      addNewSubComment: (data, parent) => {
         dispatch(addNewSubComment(data, parent));
      }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);
