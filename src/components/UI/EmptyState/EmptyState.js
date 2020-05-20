import React from 'react';
import classes from './EmptyState.module.css';

const EmptyState = (props) => (
    <div className={classes.EmptyState}>
        <h2>No Results Found</h2>
        <p>Sorry we couldn't find results for <b>"{props.q}"</b></p>
    </div>
);

export default EmptyState;