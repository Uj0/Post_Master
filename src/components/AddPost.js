import React, {Component} from 'react';
import {withRouter} from 'react-router';

import {setPostKey, setPost} from '../actions';
import {postsRef} from '../firebase';
import store from '../store/store';
import '../style/AddPost.css';

class AddPost extends Component{
  constructor(){
    super();
    this.state = {
      postContent: '',
      title: '',
      email: store.getState().email
    }
  }

  onSave(){
    postsRef.push(this.state).then((response) => store.dispatch(setPostKey(response.key)));
    store.dispatch(setPost(this.state));
    this.props.history.push('/app');
  }

  render(){
    return (
      <div class="AddPost">
        <div class="AddPostContent">
          <h4>Title</h4>
          <input
            maxLength="30"
            id="TitleIn"
            onChange={event => this.setState({title: event.target.value})}
          />
          <br />
          <h4>Post</h4>
          <textarea
            maxLength="500"
            rows="8"
            id="PostIn"
            onChange={event => this.setState({postContent: event.target.value})}
          />
          <br />
          <br />
          <button
            style={{marginRight: "5px"}}
            className="btn btn-primary"
            onClick={() => this.onSave()}
          >
            Save
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.props.history.push('/app')}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddPost);
