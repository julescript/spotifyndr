import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from './routes/Landing/Landing'
import { connect } from 'react-redux';
import Home from './routes/Home/Home';
import Albums from './routes/Albums/Albums';

import * as actionTypes from './store/actions/auth';
import axios from './utils/axios'

class App extends Component {

  state = {
    is_auth: false,
    loading: true
  }

  fetchUser = () => {
    axios.get('/me/', {
      headers: {
          'Authorization': 'Bearer ' + this.props.token,
      }
    })
      .then(res => {
          this.props.setUser(res.data);
          this.setState({
            is_auth: true,
            loading: false
          })
      })
      .catch(_ => {
        this.props.delToken();
        this.setState({
          is_auth: false,
          loading: false
        })
        console.log('Something went wrong');
      })
  }

  render() {
    if (!this.props.token) {
      return (
        <Switch>
          <Route path='/' exact component={Landing}/>
        </Switch>
      );
    }
    else {
      if (!this.state.is_auth && this.props.token) {
        this.fetchUser();
        console.log('not_auth')
      }
      return (
        <Switch>
          <Route path='/' exact component={Home}/> 
          <Route path='/artists/:id/albums' exact component={Albums}/>
          {/* <Route exact path="/artists/:id" render={() => (<Redirect to='/' />)} />
          <Route exact path="/artists" render={() => (<Redirect to='/' />)} /> */}
        </Switch>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
      token: state.authReducer.AUTH_TOKEN,
      user: state.authReducer.USER,
      is_auth: state.authReducer.IS_AUTHORIZED,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    delToken: () => dispatch({type: actionTypes.DELETE_AUTH}),
    setUser: (user) => dispatch({type: actionTypes.ADD_USER, user: user}),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
