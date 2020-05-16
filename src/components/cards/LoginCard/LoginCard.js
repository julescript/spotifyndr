import React from 'react';
import classes from './LoginCard.module.css';

const LoginCard = (props) => (
    <div className={classes.LoginCard}>
        <h3>Get started</h3>
        <button onClick={props.onClick}>Login with Spotify</button>
    </div>
);

export default LoginCard;