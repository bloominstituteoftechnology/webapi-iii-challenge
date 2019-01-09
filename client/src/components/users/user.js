import React from 'react';
import styled from "styled-components";
import UserInput from './userInput';

class User extends React.Component {
    state = {
        toUpdate: false
    }

    toggleUpdate = () => {
        this.setState({toUpdate: !this.state.toUpdate})
    }

    render() {
        return (
            <>
            {this.state.toUpdate ? 
                <UserInput forUpdate getUsers={this.props.getUsers} user={this.props.user} toggleUpdate={this.toggleUpdate}/>
                : 
                <UserDiv>
                <h3>{this.props.user.name}</h3>
                <button onClick={this.toggleUpdate}>Update User</button>
                </UserDiv>
            }
            </>
            
        )
    }
}

const UserDiv = styled.div`
    width: 95%;
    max-width: 400px;
    border: 1px solid lightblue;
    margin: 0 auto;
    color: lightblue;
    display: flex;
    justify-content: space-between;

    &:hover {
        color: lightgray;
        box-shadow: 0 0 15px 0 lightblue;
    }

    h3 {
        padding: 0 20px;
        margin: 5px;
    }

    button {
        cursor: pointer;

        &:hover {
            background: lightblue;
            color: black;
        }
        &:active {
            background: black;
            color: white;
        }
    }
`

export default User;