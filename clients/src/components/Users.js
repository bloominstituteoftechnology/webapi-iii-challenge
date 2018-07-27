import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import User from './User';

const MainContent = styled.div`
    max-width: 50%;
    width: 50%;
    margin: auto
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        this.fetchData('http://localhost:8000/users');
    }

    fetchData = async (URL) => {
        const response = await axios.get(URL);
        this.setState({
            users: response.data
        });
    }

    render() {
        return (
            <MainContent>
                {this.state.users.map(user =>
                    <Link key={user.id} to={`/users/${user.id}`} style={{color: 'black'}}>
                        <User user={user} />
                    </Link>
                )}
            </MainContent>
        );
    }
}

export default Users;
