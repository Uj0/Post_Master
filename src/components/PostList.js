import React, {Component} from 'react';

import PostTile from './PostTile';
import store from '../store/store';
import {setPostsList} from '../actions';
import {postsRef} from '../firebase';
import '../style/PostList.css';

class PostList extends Component{
  componentDidMount(){
    postsRef.on('value', snap => {
      const postsList = [];
      snap.forEach(post => {
        const title = post.val().title;
        const serverKey = post.key;
        postsList.push({title, serverKey});
      });
      store.dispatch(setPostsList(postsList));
    });
  }

  render(){
    const postsList = store.getState().postsList;
    // console.log("postsList", postsList);
    // console.log("Store", store.getState());
    // console.log("PostList", postsList);
    return (
      <div class="PostList">
        {
          postsList.map((post, index) => {
            // console.log(post.title);
            return <PostTile key={index} post={post} />;
          })
        }
      </div>
    );
  }
}

export default PostList;
