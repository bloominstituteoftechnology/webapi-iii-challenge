import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/api/users')
            .then(({ data }) => {
                this.setState({
                    users: data
                });
            })
            .catch(console.log);

    }

    render() {
        return (
            <Fragment>
                {this.state.users.map(user => (
                    <h3 key={user.id} onClick={() => this.props.history.push(`/user/${user.id}`)}>{user.name}</h3>
                ))}
            </Fragment>
        );
    }

}