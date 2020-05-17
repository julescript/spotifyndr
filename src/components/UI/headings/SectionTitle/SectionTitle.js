import React from 'react';
import classes from './SectionTitle.module.css';

const SectionTitle = (props) => (
    <div className={classes.SectionTitle}>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
    </div>
);

export default SectionTitle;