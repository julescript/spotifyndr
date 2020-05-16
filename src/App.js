import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './routes/Landing/Landing'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    if (!this.props.user) {
      return (
        <Switch>
          <Route path='/' exact component={Landing}/>
        </Switch>
      );
    }
    else {
      return (
        <Switch>
          <Route path='/' exact render={() => ('hello world')}/>
        </Switch>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
      auth: state.authReducer.AUTH_TOKEN,
      user: state.authReducer.USER,
  }
};
const mapDispatchToProps = dispatch => {
  return {
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
