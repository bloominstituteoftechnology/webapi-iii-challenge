

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './utilities/reset.css';
import './client.css';
import {UserList, UserViewer} from './user.js';

//-- Constants -----------------------------------
export const URL_BASE = 'http://localhost:8080';
export const URL_USERS = URL_BASE + '/users';

//-- Mounting ------------------------------------
const applicationStructure = (
    <Router><React.Fragment>
        <Route exact path="/" component={UserList} />
        <Route path="/users/:id" component={UserViewer} />
    </React.Fragment></Router>
);
ReactDOM.render(applicationStructure, document.getElementById('root'));
