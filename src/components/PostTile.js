import React, {Component} from 'react';

import store from '../store/store';
import {setPost, setPostKey} from '../actions';
import {postsRef} from '../firebase';

class PostTile extends Component{

  updatePost(){
    const title = postsRef.child(`${this.props.post.serverKey}`).once('value', snap => {
      store.dispatch(setPost(snap.val()));
      store.dispatch(setPostKey(this.props.post.serverKey));
    });
  }

  render(){
    return(
      <div
        id="Tile"
        onClick={() => this.updatePost()}
      >
      {this.props.post.title}
      </div>
    );
  }
}

export default PostTile;
