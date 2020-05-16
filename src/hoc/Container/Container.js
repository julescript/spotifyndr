import React from 'react';
import classes from './Container.module.css';

const Container = (props) => (
    <div className={props.className + ' ' + classes.container}>
        {props.children}
    </div>
);

export default Container;