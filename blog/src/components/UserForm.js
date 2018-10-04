import React from 'react';
import {withRouter} from 'react-router-dom';
import {addUser, fetchUsers} from '../actions/index';
import {connect} from 'react-redux';

class UserForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: ''
        }
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        let newUser = {
            name: this.state.username
        }

        this.props.addUser(newUser);

        setTimeout(() => {
            this.props.fetchUsers();
        }, 100);

    }

    render() {
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                <input onChange = {this.handleInput} name = 'username' value = {this.state.username} placeholder = 'Add New Username'></input>
                <button type = 'submit'>Add New User</button>
                </form>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        posting: state.posting,
        posted: state.posted
    }
}
export default withRouter(connect(mapStateToProps, {
    addUser,
    fetchUsers
})(UserForm));
