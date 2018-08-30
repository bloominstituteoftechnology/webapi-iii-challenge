import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    border: 1px solid black;
`

const ID = styled.h1`
    font-weight: 800;
    font-size: 1.5rem;
`;


class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    };
    componentDidMount(){
        this.getUsers("http://localhost:9000/users");
      };
    getUsers = URL => {
        fetch(URL)
            .then( res => {
            return res.json();
            })
            .then( data => {
            this.setState({ users: data });
            })
            .catch(err => {
            console.log(err)
            });
    };
    render(){
    return (
        <div>
            {this.state.users.map( user => {
                return (
                    <Div key={user.id}>
                        <ID>User ID: {user.id}</ID>
                        <p>Username: {user.name}</p>
                    </Div>
                )
            })}
        </div>
        );
    };
};


export default Users;