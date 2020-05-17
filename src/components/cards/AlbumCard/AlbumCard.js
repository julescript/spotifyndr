import React from 'react';
import classes from './AlbumCard.module.css';
import { tracksString } from '../../../utils/common';

const AlbumCard = (props) => (
    <div className={classes.AlbumCard}>
        <div style={{backgroundImage: 'url(' + props.img + ')'}} >
        <button onClick={props.onClick} disabled={props.disabled}>Preview on Spotify</button>
        </div>
        <h3>{props.name}</h3>
        <h4>{props.date + ' · ' + tracksString(props.tracks)}</h4>
    </div>
);

export default AlbumCard;