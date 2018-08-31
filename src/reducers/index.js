import {combineReducers} from 'redux';

import postsList from './postsList';
import email from './user';
import postKey from './postKey';
import post from './post';

export default combineReducers({
  email,
  postKey,
  post,
  postsList
});
