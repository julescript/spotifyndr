import React from 'react';
import classes from './AlbumCard.module.css';

const AlbumCard = (props) => (
    <div className={classes.AlbumCard}>
        <div style={{backgroundImage: 'url(' + props.img + ')'}} >
        <button onClick={props.onClick} disabled={props.disabled}>Preview on Spotify</button>
        </div>
        <h3>{props.name}</h3>
        <h4>{props.date + ' · ' + props.tracks}</h4>
    </div>
);

export default AlbumCard;