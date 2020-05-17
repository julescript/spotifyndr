import React from 'react';
import classes from './CardsGrid.module.css';

const CardsGrid = (props) => (
    <div className={classes.Grid}>
        {props.children}
    </div>
);

export default CardsGrid;