import React from 'react';
import classes from './Footer.module.css';
import Container from '../../../hoc/Container/Container';

const Footer = (props) => (
    <div className={classes.Footer}>
        <Container className={classes.Container}>
            <div className={classes.Logo}>Spotifyndr</div>
            <div className={classes.Copyright}>Made with <span role="img" aria-label='heart emoji'>❤️</span> by <a href='https://github.com/julescript' rel="noopener noreferrer" target='_blank'>julescript</a></div>
        </Container>
    </div>
);

export default Footer;