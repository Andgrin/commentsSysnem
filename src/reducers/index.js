import * as CommentsActionType from '../actionTypes/index';

const YOUR_EMAIL = 'andgrin.mb@gmail.com';
const USER_ID = 1;
const USER_NAME = 'Kurt Thompson';
const USER_AVATAR = "http://api.randomuser.me/portraits/thumb/men/69.jpg";

const initialState = {
   comments: [
   //    {
   //       "id": 5862,
   //       "content": "If not everyone makes money blogging, why is blogging so popular?",
   //       "created_at": "2018-09-13T14:31:39.964Z",
   //       "updated_at": "2018-09-13T14:31:39.964Z",
   //       "author": {
   //           "id": 1,
   //           "name": "Kurt Thompson",
   //           "avatar": "http://api.randomuser.me/portraits/thumb/men/69.jpg",
   //           "created_at": "2015-08-11T13:08:25.675Z",
   //           "updated_at": "2015-08-11T13:08:25.675Z"
   //       },
   //       "children": [
   //           {
   //               "id": 5863,
   //               "content": "A WordPress blog will stand out!",
   //               "created_at": "2018-09-13T14:31:39.972Z",
   //               "updated_at": "2018-09-13T14:31:39.972Z",
   //               "author": {
   //                   "id": 3,
   //                   "name": "Sarah Fleming",
   //                   "avatar": "http://api.randomuser.me/portraits/thumb/women/80.jpg",
   //                   "created_at": "2015-08-11T13:08:25.687Z",
   //                   "updated_at": "2015-08-11T13:08:25.687Z"
   //               }
   //           },
   //           {
   //               "id": 5864,
   //               "content": "The possibilities of designing a site with WordPress are immense indeed.",
   //               "created_at": "2018-09-13T14:31:39.981Z",
   //               "updated_at": "2018-09-13T14:31:39.981Z",
   //               "author": {
   //                   "id": 4,
   //                   "name": "Purificacion Rojas",
   //                   "avatar": "http://api.randomuser.me/portraits/thumb/women/2.jpg",
   //                   "created_at": "2015-08-11T13:08:25.694Z",
   //                   "updated_at": "2015-08-11T13:08:25.694Z"
   //               }
   //           },
   //           {
   //               "id": 5865,
   //               "content": "Anyone can blog but it takes a WordPress user to be awesome!",
   //               "created_at": "2018-09-13T14:31:39.989Z",
   //               "updated_at": "2018-09-13T14:31:39.989Z",
   //               "author": {
   //                   "id": 5,
   //                   "name": "Phillip Lynch",
   //                   "avatar": "http://api.randomuser.me/portraits/thumb/men/68.jpg",
   //                   "created_at": "2015-08-11T13:08:25.702Z",
   //                   "updated_at": "2015-08-11T13:08:25.702Z"
   //               }
   //           }
   //       ]
   //   },
   //   {
   //       "id": 5860,
   //       "content": "Each day I love you more my blog Today more than yesterday and less than tomorrow",
   //       "created_at": "2018-09-13T14:31:39.948Z",
   //       "updated_at": "2018-09-13T14:31:39.948Z",
   //       "author": {
   //           "id": 1,
   //           "name": "Kurt Thompson",
   //           "avatar": "http://api.randomuser.me/portraits/thumb/men/69.jpg",
   //           "created_at": "2015-08-11T13:08:25.675Z",
   //           "updated_at": "2015-08-11T13:08:25.675Z"
   //       },
   //       "children": [
   //           {
   //               "id": 5861,
   //               "content": "I claim there ain’t another software for blogging As great as WordPress. :)",
   //               "created_at": "2018-09-13T14:31:39.956Z",
   //               "updated_at": "2018-09-13T14:31:39.956Z",
   //               "author": {
   //                   "id": 5,
   //                   "name": "Phillip Lynch",
   //                   "avatar": "http://api.randomuser.me/portraits/thumb/men/68.jpg",
   //                   "created_at": "2015-08-11T13:08:25.702Z",
   //                   "updated_at": "2015-08-11T13:08:25.702Z"
   //               }
   //           }
   //       ]
   //   },
   //   {
   //       "id": 5859,
   //       "content": "WordPress is not responsible for people falling in love with blogging!",
   //       "created_at": "2018-09-13T14:31:39.940Z",
   //       "updated_at": "2018-09-13T14:31:39.940Z",
   //       "author": {
   //           "id": 4,
   //           "name": "Purificacion Rojas",
   //           "avatar": "http://api.randomuser.me/portraits/thumb/women/2.jpg",
   //           "created_at": "2015-08-11T13:08:25.694Z",
   //           "updated_at": "2015-08-11T13:08:25.694Z"
   //       },
   //       "children": []
   //   },
   //   {
   //       "id": 5858,
   //       "content": "It is hard to defeat WordPress as a blogging tool. :)",
   //       "created_at": "2018-09-13T14:31:39.932Z",
   //       "updated_at": "2018-09-13T14:31:39.932Z",
   //       "author": {
   //           "id": 5,
   //           "name": "Phillip Lynch",
   //           "avatar": "http://api.randomuser.me/portraits/thumb/men/68.jpg",
   //           "created_at": "2015-08-11T13:08:25.702Z",
   //           "updated_at": "2015-08-11T13:08:25.702Z"
   //       },
   //       "children": []
   //   }
   ],
   lastLoadedCommentNumb: 0,
   canLoadMore: true,
   userId: USER_ID,
   userEmail: YOUR_EMAIL,
   userName: USER_NAME,
   userAvatarSrc: USER_AVATAR,
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
         return {
            ...state,
            comments: [ 
               ...state.comments.map(c => {
                  if (c.parentId === action.parentId) {
                  c.children = [...c.children, action.newComment]
                  }
                  return c
               })
            ]
         }
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
            canLoadMore: action.canLoadMore
         }
      }

      default:
         return state
   }
}
