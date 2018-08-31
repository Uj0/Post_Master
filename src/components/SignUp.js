import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {firebaseApp} from '../firebase';

class SignUp extends Component {
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

  signUp(){
    const {email, password} = this.state;
    console.log("email", email, "password", password);
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        this.setState({error})
      })
  }

  render(){
    return(
      <div className="form-inline" style={{textAlign: "center", margin: "5%"}}>
        <h4>Sign Up</h4>
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
          onClick={() => this.signUp()}
        >
          Sign Up
        </button>
        <br />
        <Link to='/signin'>Already a user? Sign In</Link>
      </div>
    );
  }
}

export default SignUp;
