import {SIGN_IN, SET_POST_KEY, SET_POST, SET_POSTS_LIST} from '../constants';

export const setActiveUser = (email) => {
  const action = {
    type: SIGN_IN,
    email
  };
  return action
}

export const setPostKey = (postKey) => {
  const action = {
    type: SET_POST_KEY,
    postKey
  };
  return action;
}

export const setPost = (post) => {
  const action = {
    type: SET_POST,
    post
  };
  return action;
}

export const setPostsList = (postsList) => {
  const action = {
    type: SET_POSTS_LIST,
    postsList
  };
  return action;
}
