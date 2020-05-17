import React from 'react';
import classes from './BackButton.module.css';
import BackIcon from '../../../../assets/images/back_icon.svg'

const BackButton = (props) => (
    <div className={classes.BackButton} onClick={props.onClick}>
        <img src={BackIcon} alt=''/>
        <div>Back</div>
    </div>
);

export default BackButton;