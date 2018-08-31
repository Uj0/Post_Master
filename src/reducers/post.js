import {SET_POST} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case SET_POST:
      return action.post;
    default:
      return state;
  }
}
