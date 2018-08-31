import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

import store from './store/store';
import {setActiveUser} from './actions';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AddPost from './components/AddPost';
import {firebaseApp} from './firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(setActiveUser(user.email));
    if ( window.location.pathname !== "/app")
      window.location.pathname = "/app";
    //   history.push('/app');                          |Testing #TP_1
    // withRouter(({history}) => console.log(history)); |Phase
  } else {
    if ( window.location.pathname !== '/signin')
      window.location.replace("/signin");
      // history.replace('/signin');                      |Testing #TP_1
    // withRouter(({history}) => history.push('/signin'));|Phase
  }
});

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/app' component={App} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/addpost' component={AddPost} />
        </Switch>
      </div>
    </BrowserRouter>
    , document.getElementById('root'));
};

render();
store.subscribe(render);

registerServiceWorker();
