import React, { Component } from 'react';
import classes from './Home.module.css';
import Container from '../../hoc/Container/Container';
import NavBar from '../../components/navigation/NavBar/NavBar';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    componentDidMount() {
    }

    render () {
        return (
            <Container>
                <NavBar />
                this is home
            </Container>
        );
    }
}

export default withRouter(Home);