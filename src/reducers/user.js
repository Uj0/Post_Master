import {SIGN_IN} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.email;
    default:
      return state;
  }
}
