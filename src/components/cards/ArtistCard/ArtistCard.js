import React from 'react';
import classes from './ArtistCard.module.css';
import RatingStars from '../../UI/RatingStars/RatingStars';

const ArtistCard = (props) => (
    <div className={classes.ArtistCard} style={{backgroundImage: 'url(' + props.img + ')'}}>
        <div className={classes.Spacer}></div>
        <div className={classes.Info}>
            <h3>{props.name}</h3>
            <p>{props.followers}</p>
            <RatingStars rating={props.stars}/>
        </div>
    </div>
);

export default ArtistCard;