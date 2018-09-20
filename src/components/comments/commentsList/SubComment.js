import React, {Component} from 'react';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class SubComment extends Component {

   render() {
      const {dataItem ,parentName} = this.props;

      return(
         <li className="list-item list-item_comment">
            <div className="comment">
               <div className="user-avatar">
                  <div className="avatar-wraper">
                     <img src={dataItem.author.avatar} alt="" />
                  </div>
               </div>

               <div className="comment-body">
                  <div className="comment-content">
                     <div className="comment-content__header">
                        <span className="comment-content__author header-cell" >
                           <strong>{dataItem.author.name}</strong>
                        </span>
                        <span className="comment-content__reply-to header-cell">
                           <FontAwesomeIcon icon={['fas', 'reply']} flip="horizontal" /> {parentName}
                        </span>
                        <time className="comment-content__publish-time header-cell">
                           <FontAwesomeIcon icon={['far', 'clock']} flip="horizontal" />
                           <strong>{format(dataItem.author.updated_at, 'YYYY-DD-MM')}</strong>
                           &nbsp;at&nbsp;
                           <strong>{format(dataItem.author.updated_at, 'HH:mm')}</strong>
                        </time>
                     </div>

                     <p className="comment-message">{dataItem.content}</p>
                  </div>
               </div>
            </div>
         </li> 
      )
   }
}


export default SubComment;
