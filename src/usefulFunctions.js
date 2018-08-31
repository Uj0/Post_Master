import React from 'react';

import {POST, COMMENT, REPLY} from './constants';
import {singlePostRef, singleCommentRef, singleSubCommentRef} from './firebase';
import {setPost, setPostKey} from './actions';

import store from './store/store';

const deletePCR = (emailPCR, typePCR, postKey = null, commentKey = null, subCommentKey = null) => {
  const email = store.getState().email;
  if(emailPCR == email){
    switch (typePCR) {
      case POST:
        {
          singlePostRef(postKey).remove();
          store.dispatch(setPost(null));
          store.dispatch(setPostKey(null));
        }
        break;
      case COMMENT:
        {
          singleCommentRef(postKey, commentKey).remove();
          singlePostRef(postKey).once('value', post => {
            store.dispatch(setPost(post.val()));
          });
        }
        break;
      case REPLY:
        {
          singleSubCommentRef(postKey, commentKey, subCommentKey).remove();
          singlePostRef(postKey).once('value', post => {
            store.dispatch(setPost(post.val()));
          });
        }
        break;
      default:
        return null;
    }
  }
}

export default deletePCR;
