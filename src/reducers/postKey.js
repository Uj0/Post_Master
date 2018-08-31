import {SET_POST_KEY} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case SET_POST_KEY:
      return action.postKey;
    default:
      return state;
  }
}
