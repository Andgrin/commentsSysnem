import React, {Component} from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ArticleHeader extends Component {
   render() {
      const {
         articleTitle,
         datePost,
         status
      } = this.props;

      return(
         <header className="article-header">
            <div className="article-title" >
               { (status === "super") ? <i className="svg-icon"><FontAwesomeIcon icon={['fas', 'star']}  /></i> : null }
               <h1>{articleTitle}</h1>
            </div>
            <h5 className="article-subtitle"><strong>{format(datePost, 'MMMM DD, YYYY')}</strong></h5>
         </header>
      )
   }
}

ArticleHeader.propTypes = {
   datePost: PropTypes.string.isRequired,
   articleTitle: PropTypes.string.isRequired,
   status: PropTypes.string,
};


export default ArticleHeader;
