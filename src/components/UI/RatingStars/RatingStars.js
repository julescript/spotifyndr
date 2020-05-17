import React from 'react';
import classes from './RatingStars.module.css';
import FilledStar from '../../../assets/images/star_filled.svg'
import EmptyStar from '../../../assets/images/star_empty.svg'
import { UNIQUE_ID } from '../../../utils/common';

const RatingStars = (props) => {
    let n = Math.round(parseFloat(props.rating))

    if (n > 5) {
        n = 5;
    }
    else if (n < 0) {
        n = 0;
    }

    let rating = [0,0,0,0,0];

    for (let i=0;i<n;i++) {
        rating[i] = 1;
    }

    let stars = rating.map((e,idx) => {
        if (e === 0) {
            return (<img key={idx} src={EmptyStar} alt="Empty Star"/>);
        }
        else {
            return (<img key={idx} src={FilledStar} alt="Filled Star"/>);
        }
    });

    return(
        <div className={classes.RatingStars}>
            {stars}
        </div>
    );
}

export default RatingStars;