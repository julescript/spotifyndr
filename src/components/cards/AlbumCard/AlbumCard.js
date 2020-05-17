import React from 'react';
import classes from './AlbumCard.module.css';

const AlbumCard = (props) => (
    <div className={classes.AlbumCard}>
        <div style={{backgroundImage: 'url(' + props.img + ')'}} />
        <h3>{props.name}</h3>
        <h4>{props.year + ' · ' + props.tracks}</h4>
        <button onClick={props.onClick} disabled={props.disabled}>Preview on Spotify</button>
    </div>
);

export default AlbumCard;