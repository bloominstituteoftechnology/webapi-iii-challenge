import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserCard from './UserCard';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:9000/api/user')
        .then(res=> {
            const userData = res.data;
            console.log(res.data)
            setUsers(userData);
        })
        .catch(err=> {
            console.log(err);
        })
    }, [])
    
    return (
        <div>
            <Container>
                <h2>Your Feed</h2>
                {users.map(user=> (
                    <UserCard key={user.id} value={user.id} name={user.name}/>
                ))}
            </Container>
        </div>
    )
}

export default Users;

const Container = styled.div`
    margin: 0 auto;
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    h2{
        position: fixed;
        left: 20px;
        top: 10px;
        color: white;
        border-bottom: 1px solid white;
        font-size: 48px;
    }
`;