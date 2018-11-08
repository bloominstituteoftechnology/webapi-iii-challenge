

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './client.css';
import List from './utilities/list.js';
import User from './user.js';

//-- Constants -----------------------------------
const URL_BASE = 'http://localhost:8080';
const URL_USERS = URL_BASE + '/users';

//-- Mounting ------------------------------------
const applicationStructure = (
    <React.Fragment>
        <h1>Characters from Lord of the Rings</h1>
        <List
            listUrl={URL_USERS}
            itemComponent={User}
        />
    </React.Fragment>
);
ReactDOM.render(applicationStructure, document.getElementById('root'));
