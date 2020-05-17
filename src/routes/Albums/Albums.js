import React, { Component } from 'react';
import classes from './Albums.module.css';
import SectionTitle from '../../components/UI/headings/SectionTitle/SectionTitle';
import CardsGrid from '../../hoc/CardsGrid/CardsGrid';
import Container from '../../hoc/Container/Container';
import { withRouter } from 'react-router-dom';
import AlbumCard from '../../components/cards/AlbumCard/AlbumCard';
import BackButton from '../../components/UI/buttons/BackButton/BackButton';
import axios from '../../utils/axios'
import { connect } from 'react-redux';

class Albums extends Component {

    state = {
        albums: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        axios.get(this.props.match.url + '/', {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            },
            params: {
                'limit': 12
            }
          })
            .then(res => {
                this.setState({
                    albums: res.data.items,
                    loading: false,
                    error: false
                })
                console.log(this.state.albums)
            })
            .catch(err => {
                this.setState({
                    albums: null,
                    loading: false,
                    error: err.response
                })
            })
    }

    backButtonHandler = () => {
        this.props.history.goBack()
    }

    render () {
        let albums = null;
        if (this.state.albums && !this.state.loading) {
            albums = this.state.albums.map(album => {
                return (
                    <AlbumCard key={album.id} 
                        img={album.images[1] ? album.images[1].url : null} 
                        name={album.name}
                        date={album.release_date} 
                        tracks={album.total_tracks}
                        onClick={'onClick'}
                        disabled={false}/> 
                );
            });
        }
        return (
            <Container className={classes.Albums}>
                <div className={classes.Header}>
                    <SectionTitle title={'Eminem'} subtitle={'Albums'}/>
                    <div className={classes.Back}>
                        <BackButton onClick={this.backButtonHandler}/>
                    </div>
                </div>
                <CardsGrid>
                    {albums}
                </CardsGrid>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.AUTH_TOKEN
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Albums));