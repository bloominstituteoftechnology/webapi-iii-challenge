import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class extends Component {

    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/users/${this.props.match.params.id}`)
            .then(({ data }) => {
                this.setState({
                    user: data
                });
            })
            .catch(console.log)
    }

    render() {
        return (
            <Fragment>
                <h3>{this.state.user.name}</h3>
                <p onClick={() => {this.props.history.push(`/user/${this.state.user.id}/posts`)}}>view posts</p>
            </Fragment>
        );
    }

}