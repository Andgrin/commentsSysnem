import React, {Component} from 'react';
import SubComment from './SubComment';

class NestedList extends Component {
   render() {
      const {children, author} = this.props;

      return(
         <ul className="nested-comments">
            { children.map( (i, index) => {
               return (
                  <SubComment dataItem={i} parentName={author} key={index} />
               )
            }) }
         </ul>
      )
   }
}

export default NestedList;
