import React from 'react';
import classes from './Spinner.module.css';

const Spinner = (props) => {
    let spinnerClasses = [classes.LoaderParent]
    if (props.light) {
        spinnerClasses.push(classes.light)
    }
    return (
        <div className={spinnerClasses.join(' ')}>
            <div className={classes.Loader}>Loading ...</div>
        </div>
    );
}

export default Spinner;