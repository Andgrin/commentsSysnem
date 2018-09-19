import React, {Component} from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class ArticleFooter extends Component {
   render() {
      const {
         author,
         datePost,
         commentsNumb
      } = this.props;

      return(
         <div className="article-footer">
            <div className="article-footer__info-item footer-author">
               <span><FontAwesomeIcon icon={['fas', 'user']} />Post by <address><strong>{author}</strong></address></span>
            </div>

            <div className="article-footer__info-item footer-post-date">
               <span><FontAwesomeIcon icon={['far', 'clock']} />Posted <time dateTime={format(datePost, 'YYYY-MM-DD')}><strong>{format(datePost, 'MMMM DD, YYYY')}</strong></time> at <strong>{format(datePost, 'HH:mm')}</strong> </span>
            </div>

            <div className="article-footer__info-item footer-comments">
               <span><FontAwesomeIcon icon={['fas', 'comment']} /><strong>{commentsNumb}</strong> comments</span>
            </div>
         </div>
      )
   }
}

ArticleFooter.propTypes = {
   author: PropTypes.string,
   datePost: PropTypes.string.isRequired,
   commentsNumb: PropTypes.number
};

export default ArticleFooter;
