import React, {Component} from 'react';

import Empty from './Empty';
import store from '../store/store';
import {setPost} from '../actions';
import {firebaseApp, singlePostRef, postsRef} from '../firebase';
import {POST} from '../constants';
import deletePCR from '../usefulFunctions';
import '../style/PostWindow.css';

class PostWindow extends Component{
  signOut(){
    firebaseApp.auth().signOut()
      .then(() => {
        console.log("Logged Out!!!!!");
      },
      (error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  editPost(postKey){
    const postEmail = store.getState().post.email;
    const currentEmail = store.getState().email;
    // console.log("postEmail", postEmail, "currentEmail", currentEmail);
    if(postEmail==currentEmail){
      let Edit=window.prompt("Enter Post", "");
      if(Edit==null || Edit== ""){
        return null;
      } else {
        // console.log(Edit);
        // console.log(singlePostRef(postKey));
        singlePostRef(postKey).child("postContent").transaction(() => {return Edit});
        postsRef.child(`${postKey}`).once('value', snap => {
          store.dispatch(setPost(snap.val()));
        });
      }
    }
  }

  renderWhenEmpty(){
    if(store.getState().post == null)
      return <Empty />
    else {
      const {title, postContent, email} = store.getState().post;
      const {postKey} = store.getState();
      return (
        <div>
          <div id="Post" onClick={() => this.editPost(postKey)}>
            <h3><b><u>{title}</u></b></h3>
            <p>{postContent}</p>
            <br />
            <p>-By {email}</p>
          </div>
          <div>
            <button className="btn btn-danger" onClick={() => {deletePCR(email, POST, postKey)}}>Delete</button>
          </div>
        </div>
      );
    }
  }

  render(){
    return (
      <div class="PostWindow">
        <div>
          <button
            className="btn btn-danger"
            id="SignOutBtn"
            onClick={() => this.signOut()}
          >
            Sign Out
          </button>
          <button
            className="btn btn-primary"
            id="AddPostBtn"
            onClick={() => this.props.history.push('/addpost')}
          >
            +
          </button>
        </div>
        <div class="Post">
          {this.renderWhenEmpty()}
        </div>
      </div>
    );
  }
}

export default PostWindow;
