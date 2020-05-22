import React from 'react';
import classes from './ErrorState.module.css';

const ErrorState = (props) => (
    <div className={classes.ErrorState}>
        <h1>{props.code}</h1>
        <h2>{props.title}</h2>
        <p>{props.body}</p>
    </div>
);

export default ErrorState;