import React from 'react';
// import classes from './IconLogo.module.css';
import Logo from '../../../../assets/images/logo/logo_icon.svg';

const IconLogo = (props) => (
    <img src={Logo} alt="Spotifyndr logo" className={props.className}/>
);

export default IconLogo;