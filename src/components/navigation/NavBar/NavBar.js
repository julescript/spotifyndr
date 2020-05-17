import React, { Component } from 'react';
import classes from './NavBar.module.css';
import IconLogo from '../../UI/logo/IconLogo/IconLogo';

class NavBar extends Component {

    render () {
        return (
            <div className={classes.NavBar}>
                <div className={classes.Search}>
                    <IconLogo />
                    <input type="search" disabled={this.props.user ? false : true} placeholder="Search Spotify artists" onChange={this.props.onChange} onKeyDown={this.props.enterPressed}/>
                </div>
                {this.props.user ? (
                    <div className={classes.Account}>
                        <div>{this.props.user.display_name}</div>
                        <img src={null} alt=''/>
                    </div>
                ) : (
                    <div className={classes.Account}>
                        <div>Loading</div>
                        <img src={null} alt=''/>
                    </div>
                )}
            </div>
        );
    }
}

export default NavBar;