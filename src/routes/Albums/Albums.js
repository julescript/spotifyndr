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
import Spinner from '../../components/UI/Spinner/Spinner';
import { debounce, checkIfBottomReached } from '../../utils/common';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Albums extends Component {

    state = {
        albums: null,
        loading: true,
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
        this.fetchFirst();
    }

    fetchFirst() {
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
                    albums: res.data,
                    loading: false,
                    error: false,
                    didReachBottom: false
                })
            })
            .catch(err => {
                this.setState({
                    albums: null,
                    loading: false,
                    error: err.response,
                    didReachBottom: true
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.didReachBottom !== this.state.didReachBottom && prevState.didReachBottom === false) {
            if (this.state.albums){
                if(this.state.albums.items.length < this.state.albums.total && this.state.albums.items.length > this.state.albums.offset)
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
        axios.get(this.state.albums.next, {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            },
        })
            .then(res => {
                const results = {...res.data}
                const oldResults = {...this.state.albums}
                results['items'].unshift(...oldResults['items']);
                this.setState({
                    albums: results,
                    loading: false,
                    error: false,
                    didReachBottom: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.response,
                    didReachBottom: true
                })
                console.log(err)
            })
    }

    backButtonHandler = () => {
        this.props.history.goBack()
    }

    previewButtonClickedHandler = (url) => {
        window.open(url, '_blank')
    }

    render () {
        let albums = null;
        if (this.state.albums) {
            albums = this.state.albums.items.map(album => {
                return (
                    <AlbumCard key={album.id} 
                        img={album.images[1] ? album.images[1].url : null} 
                        name={album.name}
                        date={album.release_date.substring(0, 4)} 
                        tracks={album.total_tracks}
                        onClick={() => this.previewButtonClickedHandler(album.external_urls.spotify)}
                        disabled={false}/> 
                );
            });
        }
        if (this.state.loading && !this.state.albums) {
            albums = <Spinner />
        }
        return (
            <Container className={classes.Albums}>
                <div className={classes.Header}>
                    <SectionTitle title={this.state.albums ? this.state.albums.items[0].artists[0].name : 'Artist'} subtitle={'Albums'}/>
                    <div className={classes.Back}>
                        <BackButton onClick={this.backButtonHandler}/>
                    </div>
                </div>
                <WithErrorHandler>
                    {!this.state.loading || this.state.albums ? <CardsGrid>{albums}</CardsGrid> : albums}
                    {this.state.loading && this.state.albums ? <Spinner /> : null}
                </WithErrorHandler>
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