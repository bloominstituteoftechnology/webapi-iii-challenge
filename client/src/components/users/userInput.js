import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class UserInput extends React.Component {
    state = {
        name: ''
    }

    componentDidMount() {
        if(this.props.forUpdate){
            this.setState({name: this.props.user.name})
        }
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    addUser = (ev) => {
        ev.preventDefault();
        axios.post('http://localhost:5000/users', this.state)
            .then(res => {
                this.props.getUsers();
            })
            .catch(err => console.log(err));
        this.setState({name: ''});
    }

    updateUser = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();

        axios.put(`http://localhost:5000/users/${this.props.user.id}`, this.state)
            .then(res => this.props.getUsers())
            .catch(err => console.log(err));

        this.props.toggleUpdate();  
    }

    deleteUser = () => {
        axios.delete(`http://localhost:5000/users/${this.props.user.id}`)
            .then(res => {
                this.props.getUsers();
            })
            .catch(err => console.log(err));
    }

    stopProp = (ev) => {
        ev.stopPropagation();
    }

    render() {
        return(
            <StyledInput onSubmit={this.props.forUpdate ? this.updateUser : this.addUser} onClick={this.stopProp}>
                <input onClick={this.stopProp} name="name" value={this.state.name} onChange={this.handleChange} placeholder="username" />
                <button type='submit'>{this.props.forUpdate ? 'Update User' : 'Create User'}</button>
                {this.props.forUpdate ? <button className='deleteBtn' onClick={this.deleteUser}>Delete User</button> : null}
            </StyledInput>
        )
    }
}

const StyledInput = styled.form`
    width: 95%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    position: relative;
    border: 1px solid lightblue;

    input {
        width: 100%;
        font-size: 16px;
        padding: 5px 10px;
        
    }
    button {
        position: absolute;
        right: 0px;
        bottom: 0px;
        height: 100%;
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

    .deleteBtn {
        position: absolute;
        right: 90px;
        bottom: 0px;
    }
`

export default UserInput;