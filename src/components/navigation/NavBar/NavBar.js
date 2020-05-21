import React, { Component } from 'react';
import classes from './NavBar.module.css';
import IconLogo from '../../UI/logo/IconLogo/IconLogo';
import { DebounceInput } from 'react-debounce-input';
import nopp from '../../../assets/images/nopp.png'

class NavBar extends Component {

    render () {
        return (
            <div className={classes.NavBar}>
                    <IconLogo />
                    {/* <input type="search" disabled={this.props.user ? false : true} placeholder="Search Spotify artists" onChange={this.props.onChange} onKeyDown={this.props.enterPressed}/> */}
                    <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        onChange={this.props.onChange} 
                        placeholder="Search Spotify artists"
                        type="search" 
                        disabled={this.props.user ? false : true}/>
                {this.props.user ? (
                    <div className={classes.Account}>
                        <div>{this.props.user.display_name}</div>
                        <img src={nopp} alt=''/>
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