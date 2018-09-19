import React, {Component} from 'react';
import PropTypes from 'prop-types';


class LoadMoreComments extends Component {

   static propTypes = {
      onChange: PropTypes.func.isRequired
   }

   render() {
      return(
         <div className="load-more-comments">
            <div className="load-more_button-wrapper">
               <button 
                  type="button" 
                  className="btn load-more__btn" 
                  onClick={this.props.onChange} 
               >
                  load more comments
               </button>
            </div>
         </div>
      )
   }
}


export default LoadMoreComments;
