import React, { Component } from 'react';
import ErrorState from '../../components/UI/ErrorState/ErrorState';
import axios from '../../utils/axios'

class WithErrorHandler extends Component {
    state = {
        error: null,
        errorCode: null,
        errorMessage: null
    }

    componentDidMount () {
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
        });
        this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({error: error});
            // switch (error.response.status) {
            //     case 400 :
            //         // Bad Request
            //         console.log(400)
            //         break
            //     case 401 :
            //         // Unauthorized
            //         console.log(401)
            //         break
            //     case 404 :
            //         // Not Found
            //         console.log(404)
            //         break
            //     case 429 :
            //         // Too Many Requests - Rate limiting has been applied.
            //         console.log(429)
            //         break
            //     case 500 :
            //         // Internal Server Error
            //         console.log(500)
            //         break
            //     case 502 :
            //         // Bad Gateway
            //         console.log(502)
            //         break
            //     case 503 :
            //         // Service Unavailable
            //         console.log(503)
            //         break
            //     default :
            //         break
            // }
        });
    }

    componentWillUnmount () {
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
        this.setState({error: null});
    }

    render () {
        return (
            <React.Fragment>
                {this.state.error? <ErrorState title={'Something Went Wrong'} body={this.state.error.message}/> : this.props.children}
            </React.Fragment>
        );
    }
}

export default WithErrorHandler;