import React from 'react';

import Paper from 'material-ui/Paper';

import {Redirect} from 'react-router-dom';

const styles = {
  paper: {
    minHeight: '100px',
    padding: '40px'
  }
};

export default class CartoonsDirectory extends React.Component {
  checkIfAuthenticated() {
    return localStorage.getItem('token');
  }

  render() {
    return (
      <Paper style={styles.paper}>
        { this.checkIfAuthenticated() ? (
              <h2>This is Cartoons Directory</h2>
          ) : (
            <Redirect to={{
              pathname: "/"
            }} />
          )
        }
      </Paper>
    );
  }
}
