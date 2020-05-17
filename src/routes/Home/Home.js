import React, { Component } from 'react';
// import classes from './Home.module.css';
import Container from '../../hoc/Container/Container';
import NavBar from '../../components/navigation/NavBar/NavBar';
import { withRouter } from 'react-router-dom';
import SectionTitle from '../../components/UI/headings/SectionTitle/SectionTitle';
import CardsGrid from '../../hoc/CardsGrid/CardsGrid';
import ArtistCard from '../../components/cards/ArtistCard/ArtistCard';

class Home extends Component {

    componentDidMount() {
    }

    render () {
        return (
            <Container>
                <NavBar />
                <SectionTitle title={'Artists'} subtitle={'Showing results for “Dua Lipa”'}/>
                <CardsGrid>
                    <ArtistCard img={'https://spottedsounds.com/wp-content/uploads/2017/01/dualipa.jpg'} name={'Dua Lipa'} followers={24325435} stars={4}/>
                    <ArtistCard img={null} name={'Dua Lipa'} followers={24325435} stars={2.1}/>
                </CardsGrid>
            </Container>
        );
    }
}

export default withRouter(Home);