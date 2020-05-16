import React, { Component } from 'react';
import classes from './Landing.module.css';
import { withRouter } from 'react-router-dom'
import { my_client_id } from '../../utils/common';
import axios from '../../utils/axios'
import Container from '../../hoc/Container/Container';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/auth';
import LoginCard from '../../components/cards/LoginCard/LoginCard';
import IconLogo from '../../components/UI/logo/IconLogo/IconLogo';

class Landing extends Component {

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
            axios.get('/me/', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => {
                    this.props.setToken(token);
                    this.props.setUser(res.data)
                })
                .catch(_ => {
                    console.log('Something went wrong')
                })
        }
        else {
            console.log("Not authorized yet") 
        }
    }

    loginWithSpotifyHandler = () => {
        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(my_client_id);
        url += '&scope=' + encodeURIComponent('user-read-private user-read-email');
        url += '&redirect_uri=http://localhost:3000';
        window.location = url; 
    }

    render () {
        return (
            <div className={classes.Landing}>
                <Container className={classes.Landing}>
                    <div className={classes.leftPane}>
                        <h1>find<br/>your<br/>artists</h1>
                        <IconLogo className={classes.IconLogo}/>
                    </div>
                    <div className={classes.rightPane}>
                        <LoginCard onClick={this.loginWithSpotifyHandler}/>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.USER
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setToken: (token) => dispatch({type: actionTypes.ADD_AUTH, token: token}),
        setUser: (user) => dispatch({type: actionTypes.ADD_USER, user: user}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));