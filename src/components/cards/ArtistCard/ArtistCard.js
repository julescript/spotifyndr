import React from 'react';
import classes from './ArtistCard.module.css';
import RatingStars from '../../UI/RatingStars/RatingStars';
import { followersString } from '../../../utils/common';
import NoImg from '../../../assets/images/no_img.svg'

const ArtistCard = (props) => {
    let backstyle = {
        backgroundImage: "url(" + (props.img ? props.img : NoImg) + ")",
        backgroundSize: props.img ? 'cover' : 'contain',
        backgroundPosition: props.img ? 'center' : 'top'
    }
    return(
        <div className={classes.ArtistCard} style={backstyle} onClick={props.onClick}>
            <div className={classes.Spacer}></div>
            {/* <img src={NoImg} /> */}
            <div className={classes.Info}>
                <h3>{props.name}</h3>
                <p>{followersString(props.followers)}</p>
                <RatingStars rating={props.stars}/>
            </div>
        </div>
    );
}

export default ArtistCard;