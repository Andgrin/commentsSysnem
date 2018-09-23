import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Article from './article/Article';
import CommentsSystem from './comments/CommentsSystem';


class Main extends Component {
  render () {
    return (
      <main className="main-container">
        <div className="top-background"></div>
        <div className="content-wrapper">   
            <Article />
            <CommentsSystem />
        </div>
      </main>
    )
  }
}


export default Main;
