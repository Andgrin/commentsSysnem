import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import '../../styles/Article.css'


class Article extends Component {
   constructor(props) {
      super(props);
      this.author = `Will Smith`;
      this.datePost = "2018-09-13T14:31:39.972Z";
      this.title = `The Road to Home`;
      this.status = 'super';
      this.commentsNumb = 12;
   }

   render () {
      return (
         <article className="page-article">
            <ArticleHeader 
               articleTitle={this.title} 
               datePost={this.datePost} 
               status={this.status}
            />
            <ArticleBody 
               author={this.author} 
               datePost={this.datePost} 
               commentsNumb={this.commentsNumb}  
            />
         </article>
      )
   }
}

// Article.propTypes = {
//    author: PropTypes.string,
//    datePost: PropTypes.string.isRequired,
//    title: PropTypes.string.isRequired,
//    status: PropTypes.string,
//    commentsNumb: PropTypes.number
// };

export default Article;
