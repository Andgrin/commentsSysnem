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

export const addNewSubComment = data => {
   return {
      type: CommentsActionType.ADD_NEW_SUB_COMMENT,
      data
   }
}

export const editComment = data => {
   return {
      type: CommentsActionType.EDIT_COMMENT,
      data
   }
}

export const deleteComment = id => {
   return {
      type: CommentsActionType.REMOVE_COMMENT,
      id
   }
}

export const checkCanLoadMore = data => {
   return {
      type: CommentsActionType.CHECK_CAN_LOAD_MORE,
      data
   }
}

export const triggerCommentForm = obj => {
   return {
      type: CommentsActionType.TRIGGER_COMMENT_FORM,
      obj
   }
}
