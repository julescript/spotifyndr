import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from './routes/Landing/Landing'
import { connect } from 'react-redux';
import Home from './routes/Home/Home';
import Albums from './routes/Albums/Albums';

import * as actionTypes from './store/actions/auth';
import axios from './utils/axios'
import Layout from './hoc/Layout/Layout';

class App extends Component {

  state = {
    is_auth: false,
    loading: true
  }

  componentDidMount() {
    const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
        }, {});

    let token = hash.access_token;

    if (token) {
        this.props.setToken(token);
    }
    else {
        console.log("Not authorized yet") 
    }
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
          <Route path='/artists/:id/albums' exact component={Albums}/>
          <Route exact path="*" render={() => (<Redirect to='/' />)} />
        </Switch>
      );
    }
    else {
      if (!this.state.is_auth && this.props.token) {
        this.fetchUser();
        console.log('not_auth')
      }
      return (
        <Layout>
          <Switch>
            <Route path='/' exact component={Home}/> 
            <Route path='/artists/:id/albums' exact component={Albums}/>
            <Route exact path="/artists/:id" render={() => (<Redirect to='/' />)} />
            <Route exact path="/artists" render={() => (<Redirect to='/' />)} />
          </Switch>
        </Layout>
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
    setToken: (token) => dispatch({type: actionTypes.ADD_AUTH, token: token}),
    setUser: (user) => dispatch({type: actionTypes.ADD_USER, user: user}),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
