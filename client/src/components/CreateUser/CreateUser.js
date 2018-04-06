import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    state = {
        name: '',
    }
    render() {
        return (
            <div>
                <h3>Create User</h3>
                <form onSubmit={() => this.handleSubmit() }>
                    <input onChange={this.handleChange.bind(this)} />
                </form>
            </div>
        );
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
        });
        console.log(this.state.name);
    }

    handleSubmit() {
        axios
            .post(`http://localhost:5000/api/users/`, {
                name: this.state.name,
            })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
}

export default CreateUser;