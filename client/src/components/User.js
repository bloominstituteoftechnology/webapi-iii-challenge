import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div>
                <h2>{this.props.user.name}</h2>
                <p>ID: {this.props.user.id}</p>
                <hr/>
            </div>
        )
    }
}

export default User;