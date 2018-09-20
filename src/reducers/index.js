import * as CommentsActionType from '../actionTypes/index';
import update from 'immutability-helper';

const YOUR_EMAIL = 'andgrin.mb@gmail.com';
const USER_ID = 1;
const USER_NAME = 'Kurt Thompson';
const USER_AVATAR = "http://api.randomuser.me/portraits/thumb/men/69.jpg";

const initialState = {
   comments: [],
   lastLoadedCommentNumb: 0,
   canLoadMore: true,
   userId: USER_ID,
   userEmail: YOUR_EMAIL,
   userName: USER_NAME,
   userAvatarSrc: USER_AVATAR,
   showCommentForm: {
      type: ''
   }
}

export default function Comment (state = initialState, action) {
   switch (action.type) {
      case CommentsActionType.GET_COMMENTS_LIST: {
         return {
            ...state,
            comments: action.comments
         }
      }

      case CommentsActionType.ADD_NEW_COMMENT: {
         return {
            ...state,
            comments: [...state.comments, action.newComment]
         }
      }

      case CommentsActionType.ADD_NEW_SUB_COMMENT: {
         return update(state, { 
            comments: { 
               [action.data.id]: {
                  children: {$push: [action.data.comment]}
               }
            }
         });
      }

      case CommentsActionType.EDIT_COMMENT: {
         return update(state, { 
            comments: { 
               [action.data.id]: {
                  content: {$set: action.data.comment}
               }
            }
         });
      }

      case CommentsActionType.REMOVE_COMMENT: {
         return {
            ...state,
            comments: [
               ...state.comments.slice(0, action.id),
               ...state.comments.slice(action.id + 1)
            ]
         }
      }

      
      case CommentsActionType.CHECK_CAN_LOAD_MORE: {
         return {
            ...state,
            canLoadMore: action.data.canLoadMore,
            lastLoadedCommentNumb: action.data.numb
         }
      }

      case CommentsActionType.TRIGGER_COMMENT_FORM: {
         return {
            ...state, 
            showCommentForm: action.obj
         }
      }

      default:
         return state
   }
}
