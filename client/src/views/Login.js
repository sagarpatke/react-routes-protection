import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {Link} from 'react-router-dom';

import superagent from 'superagent';

import {Redirect} from 'react-router-dom';

const styles = {
  paper: {
    minHeight: '100px',
    padding: '40px'
  }
};

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {username: "", password: ""}
  }

  handleUsernameChange(event) {
    const username = event.target.value;
    this.setState({username: username});
  }

  handlePasswordChange(event) {
    const password = event.target.value;
    this.setState({password: password});
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const requestBody = {
      username: this.state.username,
      password: this.state.password
    }

    superagent
      .post('/auth/v1')
      .send(requestBody)
      .end((err, res) => {
        if(err) { console.error("ERR:", err); return; }
        const token = res.body.token;
        localStorage.setItem('token', token);
        this.setState({});
      });
  }

  checkIfAuthenticated() {
    return localStorage.getItem('token');
  }

  render() {
    return (
      <Paper style={styles.paper}>
        
        {this.checkIfAuthenticated() ? (
          <Redirect to={{
            pathname: '/app',
          }}/>
        ) : (
          <div>
            <h2>Login</h2>

            <form onSubmit={this.handleFormSubmission.bind(this)}>
            
            <TextField
              floatingLabelText="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}/>

            <TextField
              floatingLabelText="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
              type="password" />

            <RaisedButton label="Login" type="submit" primary />

            </form>
          </div>
        )}
      </Paper>
    );
  }
}
