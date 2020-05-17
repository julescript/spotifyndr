import React from 'react';
import classes from './Layout.module.css';
import Footer from '../../components/navigation/Footer/Footer';

const Layout = (props) => (
    <div className={classes.Layout}>
        <div className={classes.Children}>
            {props.children}
        </div>
        <Footer />
    </div>
);

export default Layout;