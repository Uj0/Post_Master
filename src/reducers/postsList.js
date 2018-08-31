import {SET_POSTS_LIST} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case SET_POSTS_LIST:
      return action.postsList;
    default:
      return state;
  }
}
