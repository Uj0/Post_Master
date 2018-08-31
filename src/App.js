import React, { Component } from 'react';

// import {firebaseApp, postsRef} from './firebase';
// import logo from './logo.svg';
import './App.css';
import Comments from './components/Comments';
import PostList from './components/PostList';
import PostWindow from './components/PostWindow';

class App extends Component {

  render() {
    return (
      <div className="App">
        <PostList />
        <PostWindow history={this.props.history} />
        <Comments />
      </div>
    );
  }
}

export default App;
