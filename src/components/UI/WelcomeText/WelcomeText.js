import React from 'react';
import classes from './WelcomeText.module.css';

const WelcomeText = (props) => (
    <div className={classes.WelcomeText}>
        <h1>{props.name},</h1>
        <h2>Welcome to Spotifyndr</h2>
        <hr />
        <h3>Simply start by typing your desired artist in the search bar</h3>
    </div>
);

export default WelcomeText;