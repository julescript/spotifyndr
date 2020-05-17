import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import authReducer from './store/reducers/auth';
import searchReducer from './store/reducers/search';

import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './utils/ScrollToTop';

const rootReducer = combineReducers({
  authReducer: authReducer,
  searchReducer: searchReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename='/'>
        <ScrollToTop />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
