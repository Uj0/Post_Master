import React, {Component} from 'react';

import store from '../store/store';
import {setPost} from '../actions';
import {COMMENT, REPLY} from '../constants';
import deletePCR from '../usefulFunctions';
import {singleCommentRef, subCommentsRef, postsRef, singleSubCommentRef} from '../firebase';

class CommentTile extends Component{
  editComment(commentKey){
    const commentEmail = store.getState().post.comments[`${commentKey}`].email;
    const {postKey} = store.getState();
    const currentEmail = store.getState().email;
    if(commentEmail==currentEmail){
      let Edit=window.prompt("Enter comment", "");
      if(Edit==null || Edit== ""){
        return null;
      } else {
        singleCommentRef(postKey, commentKey).child("comment").transaction(() => {return Edit});
        postsRef.child(`${postKey}`).once('value', snap => {
          store.dispatch(setPost(snap.val()));
        });
      }
    }
  }

  editSubComment(postKey, commentKey, subCommentKey){
    const subCommentEmail = store.getState().post.comments[`${commentKey}`].subComments[`${subCommentKey}`].email;
    const currentEmail = store.getState().email;
    console.log(subCommentEmail, currentEmail);
    if(subCommentEmail==currentEmail){
      let Edit=window.prompt("Enter Reply", "");
      if(Edit==null || Edit== ""){
        return null;
      } else {
        singleSubCommentRef(postKey, commentKey, subCommentKey).child("reply").transaction(() => {return Edit});
        postsRef.child(`${postKey}`).once('value', snap => {
          store.dispatch(setPost(snap.val()));
        });
      }
    }
  }

  replyOnComment(commentKey){
    const {postKey, email} = store.getState();
    let reply=window.prompt("Enter Reply", "");
    if(reply==null || reply== ""){
      return null;
    } else {
      subCommentsRef(postKey, commentKey).push({reply, email});
      postsRef.child(`${postKey}`).once('value', snap => {
        store.dispatch(setPost(snap.val()));
      });
    }
  }

  renderSubComments(commentKey){
    const {subComments} = store.getState().post.comments[`${commentKey}`];
    const postKey = store.getState().postKey;
    if(subComments){
      // console.log(subComments);
      return Object.keys(subComments).map(subCommentKey => {
        const email = subComments[subCommentKey].email;
        const reply = subComments[subCommentKey].reply;
        return(
          <div id="SubComment" key={subCommentKey}>
            <div id="SubComment__Header">{email}</div>
            <hr />
            <div id="SubComment__Main">{reply}</div>
            <div id="SubComment__Footer">
              <button id="SubComment__Edit__Btn" className="btn-default" onClick={() => {this.editSubComment(postKey, commentKey, subCommentKey)}}>Edit</button>
              |
              <button className="btn-danger" id="SubComment__Del__Btn" onClick={() => {
                deletePCR(email, REPLY, postKey, commentKey, subCommentKey);
              }}>
                Delete
              </button>
            </div>
          </div>
        );
      });
    } else {
      return null;
    }
  }

  render(){
    const commentKey = this.props.commentKey;
    const email = this.props.content.email;
    const comment = this.props.content.comment;
    const postKey = store.getState().postKey;
    return(
      <div id="Comment">
        <div id="Comment__Email">
          {email}
        </div>
        <hr id="Comment__Partition"/>
        <div>
          {comment}
        </div>
        <div id="Comment__Footer">
          <button  id="Footer_Buttons" onClick={() => this.editComment(commentKey)}>Edit</button>
          |
          <button id="Footer_Buttons" onClick={() => this.replyOnComment(commentKey)}>Reply</button>
          |
          <button className="btn-danger" id="Delete" onClick={() => {deletePCR(email, COMMENT, postKey, commentKey)}}>Delete</button>
        </div>
        {this.renderSubComments(commentKey)}
      </div>
    );
  }
}

export default CommentTile;
