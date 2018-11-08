

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './utilities/list.js';
import User from './user.js';

//-- Constants -----------------------------------
const URL_BASE = 'http://localhost:8080';
const URL_USERS = URL_BASE + '/users';

//-- Mounting ------------------------------------
const applicationStructure = (
    <List
        listUrl={URL_USERS}
        itemComponent={User}
    />
);
ReactDOM.render(applicationStructure, document.getElementById('root'));
