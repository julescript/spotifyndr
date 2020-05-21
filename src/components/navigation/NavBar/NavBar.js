import React, { Component } from 'react';
import classes from './NavBar.module.css';
import IconLogo from '../../UI/logo/IconLogo/IconLogo';
import { DebounceInput } from 'react-debounce-input';
import nopp from '../../../assets/images/nopp.png'
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/auth';

class NavBar extends Component {

    logoutHandler = () => {
        this.props.delToken()
    }

    render () {
        return (
            <div className={classes.NavBar}>
                    <IconLogo />
                    {/* <input type="search" disabled={this.props.user ? false : true} placeholder="Search Spotify artists" onChange={this.props.onChange} onKeyDown={this.props.enterPressed}/> */}
                    <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        onChange={this.props.onChange} 
                        placeholder="Search Spotify artists"
                        type="search" 
                        disabled={this.props.user ? false : true}/>
                {this.props.user ? (
                    <div className={classes.Account}>
                        <div>{this.props.user.display_name}</div>
                        <img src={nopp} alt=''/>
                        <div className={classes.DropdownContent}>
                            <a onClick={this.logoutHandler}>Lougout</a>
                        </div>
                    </div>
                ) : (
                    <div className={classes.Account}>
                        <div>Loading</div>
                        <img src={nopp} alt=''/>
                    </div>
                )}
            </div>
        );
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
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);