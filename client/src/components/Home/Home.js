import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>You're home!</h1>
                <Link to='/users'>
                    <h4>Users</h4>
                </Link>
            </div>
        );
    }
}

export default Home;