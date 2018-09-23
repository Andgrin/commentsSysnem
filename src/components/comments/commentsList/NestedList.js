import React from 'react';
import PropTypes from 'prop-types';
import SubComment from './SubComment';


const NestedList = ({
  children, 
  author,
}) => (
  <ul className="nested-comments">
    { children.map( (i, index) => {
      return (
        <SubComment dataItem={i} parentName={author} key={index} />
      )
    }) }
  </ul>
)

NestedList.propTypes = {
  children: PropTypes.array.isRequired,
  author: PropTypes.string,
}

export default NestedList;
