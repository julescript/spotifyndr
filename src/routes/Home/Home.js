import React, { Component } from 'react';
// import classes from './Home.module.css';
import Container from '../../hoc/Container/Container';
import NavBar from '../../components/navigation/NavBar/NavBar';
import { withRouter } from 'react-router-dom';
import SectionTitle from '../../components/UI/headings/SectionTitle/SectionTitle';
import CardsGrid from '../../hoc/CardsGrid/CardsGrid';
import ArtistCard from '../../components/cards/ArtistCard/ArtistCard';
import { debounce, checkIfBottomReached, isEmptyOrSpaces } from '../../utils/common';
import axios from '../../utils/axios'
import { connect } from 'react-redux';
import WelcomeText from '../../components/UI/WelcomeText/WelcomeText';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionTypes from '../../store/actions/search/index';
import EmptyState from '../../components/UI/EmptyState/EmptyState';

class Home extends Component {

    state = {
        searchResults: null,
        searchQuery: '',
        loading: false,
        error: false,
        didReachBottom: false
    }

    componentDidMount() {
        window.addEventListener('scroll', debounce(() => {
            if (checkIfBottomReached()) {
                this.setState({
                    didReachBottom: true
                })
            }
        }, 100));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.didReachBottom !== this.state.didReachBottom && prevState.didReachBottom === false) {
            if (this.props.results){
                if(this.props.results.items.length < this.props.results.total && this.props.results.items.length > this.props.results.offset)
                    this.fetchNext()
                else
                    console.log('limit reached no more requests')
            }
            
        }
    }

    fetchNext() {
        this.setState({
            loading: true,
            error: false
        })
        this.props.onLoadingUpdated(true);
        axios.get(this.props.results.next, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            },
        })
            .then(res => {
                const results = {...res.data.artists}
                const oldResults = {...this.props.results}
                results['items'].unshift(...oldResults['items']);
                this.setState({
                    searchResults: results,
                    loading: false,
                    error: false,
                    didReachBottom: false
                })
                this.props.onResultsUpdated(results)
                this.props.onLoadingUpdated(false)
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.response,
                    didReachBottom: true
                })
                this.props.onLoadingUpdated(false)
                console.log(err)
            })
    }

    handleSearch = (e) => {
        const q = e.target.value;
        this.setState({
            searchQuery: q,
        })
        if (!isEmptyOrSpaces(q)) {
            this.performSearch(q);
        }
    }

    performSearch(q) {
        this.setState({
            loading: true,
            error: false,
            didReachBottom: false
        })
        this.props.onQueryUpdated(q)
        this.props.onLoadingUpdated(true);
        axios.get('/search/', {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            },
            params: {
                'q': q,
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
                this.props.onResultsUpdated(res.data.artists)
                this.props.onLoadingUpdated(false)
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.response
                })
                this.props.onLoadingUpdated(false)
            })
    }

    ArtistClickedHandler = (id) => {
        this.props.history.push({
            pathname: '/artists/' + id + '/albums'
        });
    }

    render () {
        let results = null;
        let emptyState = null;
        if (this.props.results) {
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
            if (this.props.results.items.length === 0 && !this.props.loading) {
                emptyState = <EmptyState q={this.props.query} />
            }
        }
        if (this.props.loading && !this.props.results) {
            results = <Spinner />
        }
        return (
            <Container>
                <NavBar onChange={this.handleSearch} user={this.props.user} query={this.props.query}/>
                {this.props.query !== '' ? (
                    <React.Fragment>
                        <SectionTitle title={'Artists'} subtitle={'Showing results for “'+this.props.query+'"'}/>
                        {!this.props.loading || this.props.results ? <CardsGrid>{results}</CardsGrid> : results}
                        {this.props.loading && this.props.results ? <Spinner /> : null}
                        {emptyState}
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