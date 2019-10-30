import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserCard from './UserCard';

const Users = () => {
    return (
        <div>
            <h1>Users</h1>
            <UserCard/>
        </div>
    )
}

export default Users;