import * as CommentsActionType from '../actionTypes';

export const getCommentsList = comments => {
   return {
      type: CommentsActionType.GET_COMMENTS_LIST,
      comments
   }
}

export const addNewComment = newComment => {
   return {
      type: CommentsActionType.ADD_NEW_COMMENT,
      newComment
   }
}

export const addNewSubComment = (newComment, parentId) => {
   return {
      type: CommentsActionType.ADD_NEW_SUB_COMMENT,
      newComment,
      parentId
   }
}

export const deleteComment = id => {
   return {
      type: CommentsActionType.REMOVE_COMMENT,
      id
   }
}

export const checkCanLoadMore = canLoadMore => {
   return {
      type: CommentsActionType.CHECK_CAN_LOAD_MORE,
      canLoadMore
   }
}

