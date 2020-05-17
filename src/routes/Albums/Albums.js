import React, { Component } from 'react';
import classes from './Albums.module.css';
import SectionTitle from '../../components/UI/headings/SectionTitle/SectionTitle';
import CardsGrid from '../../hoc/CardsGrid/CardsGrid';
import Container from '../../hoc/Container/Container';
import AlbumCard from '../../components/cards/AlbumCard/AlbumCard';
import BackButton from '../../components/UI/buttons/BackButton/BackButton';

class Albums extends Component {
    render () {
        return (
            <Container className={classes.Albums}>
                <div className={classes.Header}>
                    <SectionTitle title={'Eminem'} subtitle={'Albums'}/>
                    <div className={classes.Back}>
                        <BackButton />
                    </div>
                </div>
                <CardsGrid>
                    {/* <AlbumCard key={'id'} 
                        name={'name'}
                        year={'year'} 
                        tracks={'tracks'}
                        onClick={'onClick'}
                        disabled={false}/>  */}
                </CardsGrid>
            </Container>
        );
    }
}

export default Albums;