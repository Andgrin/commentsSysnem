import React, {Component} from 'react';
import PropTypes from 'prop-types';


class CommentForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         value: this.props.text || ''
      };
  
      this.handleChange = this.handleChange.bind(this);
   }
  
   static propTypes = {
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
   }

   // Handle input change
   handleChange(event) {
      this.setState({value: event.target.value});
   }

   // Clear input
   clearInputValue() {
      this.setState({value: ''});
   }

   // Submit on press ENTER 
   handleKeyUp = (e) => {
      if (e.keyCode === 13) {
      this.handleGoClick()
      }
   }

   // Execute callback func with new value
   handleGoClick = () => {
      if ( this.state.value.length > 0 ) {
         this.props.onChange(this.state.value);
         this.clearInputValue();
      } else {
         alert("Please write some text!");
      }
   }

   render() {
      return (
         <div className="comment-form">
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


export default CommentForm;
