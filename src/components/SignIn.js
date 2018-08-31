import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {firebaseApp} from '../firebase';

class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      error: {
        message:''
      }
    }
  }

  signIn(){
    const {email, password} = this.state;
    // console.log("email", email, "password", password);
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        this.setState({error})
      });
  }

  render(){
    return(
      <div className="form-inline" style={{textAlign: "center", margin: "5%"}}>
        <h4>Sign In</h4>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="E-mail ID"
            style={{margin: "5%"}}
            onChange={event => this.setState({email: event.target.value})}
          />
          <br />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            style={{margin: "5%"}}
            onChange={event => this.setState({password: event.target.value})}
          />
        </div>
        <br />
        <button
          className="btn btn-primary"
          style={{margin: "5px"}}
          onClick={() => this.signIn()}
        >
          Sign In
        </button>
        <br />
        <Link to="/signup">Not a user? Sign Up</Link>
      </div>
    );
  }
}

export default SignIn;
