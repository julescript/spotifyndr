import React, { Component } from 'react';
// import classes from './Home.module.css';
import Container from '../../hoc/Container/Container';
import NavBar from '../../components/navigation/NavBar/NavBar';
import { withRouter } from 'react-router-dom';
import SectionTitle from '../../components/UI/headings/SectionTitle/SectionTitle';
import CardsGrid from '../../hoc/CardsGrid/CardsGrid';
import ArtistCard from '../../components/cards/ArtistCard/ArtistCard';
import { isEmptyOrSpaces } from '../../utils/common';
import axios from '../../utils/axios'
import { connect } from 'react-redux';
import WelcomeText from '../../components/UI/WelcomeText/WelcomeText';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionTypes from '../../store/actions/search/index';

class Home extends Component {

    state = {
        searchResults: null,
        searchQuery: '',
        loading: false,
        error: false
    }

    componentDidMount() {
    }
        
    handleSearch = (e) => {
        if (e.key === 'Enter' &&  !isEmptyOrSpaces(e.target.value)) {
            this.setState({
                searchQuery: e.target.value,
                loading: true,
                error: false
            })
            this.props.onQueryUpdated(e.target.value)
            this.props.onLoadingUpdated(true);
            axios.get('/search/', {
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                },
                params: {
                    'q': e.target.value,
                    'type': 'artist',
                    'limit': 12
                }
            })
                .then(res => {
                    this.setState({
                        searchResults: res.data.artists,
                        loading: false,
                        error: false
                    })
                    console.log('GOT EM')
                    this.props.onResultsUpdated(res.data.artists)
                    this.props.onLoadingUpdated(false)
                })
                .catch(err => {
                    this.setState({
                        searchResults: null,
                        loading: false,
                        error: err.response
                    })
                    console.log('GOT EROOR')
                    this.props.onResultsUpdated(null)
                    this.props.onLoadingUpdated(false)
                })

        }
    }

    ArtistClickedHandler = (id) => {
        this.props.history.push({
            pathname: '/artists/' + id + '/albums'
        });
    }

    render () {
        let results = null;
        if (this.props.results && !this.props.loading) {
            console.log(this.props.results)
            results = this.props.results.items.map(artist => {
                return (
                    <ArtistCard img={artist.images[1] ? artist.images[1].url : null} 
                        name={artist.name} 
                        followers={artist.followers.total} 
                        stars={(artist.popularity/20.0)}
                        key={artist.id}
                        onClick={() => this.ArtistClickedHandler(artist.id)} />
                );
            });
        }
        if (this.props.loading) {
            results = <Spinner />
        }
        return (
            <Container>
                <NavBar enterPressed={this.handleSearch} user={this.props.user} query={this.props.query}/>
                {this.props.query !== '' ? (
                    <React.Fragment>
                        <SectionTitle title={'Artists'} subtitle={'Showing results for “'+this.props.query+'"'}/>
                        {!this.props.loading ? <CardsGrid>{results}</CardsGrid> : results}
                    </React.Fragment>
                ) : (
                    <WelcomeText name={this.props.user ? this.props.user.display_name : 'Hello'}/>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.USER,
        token: state.authReducer.AUTH_TOKEN,
        results: state.searchReducer.SEARCH_RESULTS,
        query: state.searchReducer.SEARCH_QUERY,
        loading: state.searchReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResultsUpdated: (data) => dispatch({type: actionTypes.UPDATE_SARCH, data: data}),
        onQueryUpdated: (data) => dispatch({type: actionTypes.UPDATE_QUERY, data: data}),
        onLoadingUpdated: (value) => dispatch({type: actionTypes.SET_LOADING, value: value})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));