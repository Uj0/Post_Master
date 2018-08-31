import React, {Component} from 'react';

import CommentTile from './CommentTile';
import {setPost, setPostKey} from '../actions';
import store from '../store/store';
import {commentsRef, postsRef} from '../firebase';
import '../style/Comments.css';

class Comments extends Component{
  constructor(){
    super();
    this.state = {
      typing: ""
    }
  }

  addComment(event){
    event.preventDefault();
    const {postKey, email} = store.getState();
    const {typing} = this.state;
    commentsRef(postKey).push({comment: typing, email});
    this.setState({typing: ""});
    postsRef.child(`${postKey}`).once('value', snap => {
      store.dispatch(setPost(snap.val()));
      store.dispatch(setPostKey(postKey));
    });
  }

  createCommentTile(){
    const {comments} = store.getState().post;
    if(comments)
    {
      return Object.keys(comments).map((key) => {
        return <CommentTile content={comments[key]} key={key} commentKey={key} />
      });
    } else {
      return null;
    }
  }

  renderWhenEmpty(){
    let post = store.getState().post;
    if(post){
      return (
        <div>
          <div class="Comments__Header">
            <strong>Comments</strong>
          </div>
          <hr />
          <div class="Comments__Main">
            {this.createCommentTile()}
          </div>
            <form onSubmit={(event) => this.addComment(event)}>
              <input
                class="Comment__Input"
                value={this.state.typing}
                onChange={(event) => this.setState({typing: event.target.value})}
              />
            </form>
        </div>
      );
    } else {
      return (<div class="Empty__Comments">
        <h3><strong><u>Firstly,</u></strong>
        <br />Select a Post</h3>
        <h4>THEN WE MAY TALK</h4>
        <h1>(-_-)</h1>
      </div>);
    }
  }

  render(){
    return (
      <div class="Comments">
        {this.renderWhenEmpty()}
      </div>
    );
  }
}

export default Comments;
