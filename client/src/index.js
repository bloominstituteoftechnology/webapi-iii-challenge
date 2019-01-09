import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import allReducers from './reducers';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';


const store = createStore(allReducers, applyMiddleware(logger, ReduxThunk))
ReactDOM.render(<Provider store={store}>
                  <Router>
                    <App />
                  </Router>
                </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
