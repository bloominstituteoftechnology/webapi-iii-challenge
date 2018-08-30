import React, { Component } from 'react';
import { Link } from "react-router-dom";

class UserPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            user: {}
        };
        console.log("UserPost", props);
    }
    
    componentDidMount() {
        const user = this.state.users.find(user => user.id == this.props.match.params.id);
        console.log("user", user)
        if (!user) return;
        this.setState({ user });
    }
    
    render() {
        return (
            <div className="body-container">
                <h3>{ this.state.user.id }</h3>
                <h3>{ this.state.user.name }</h3>
                <Link to="/users/">Go back</Link>
            </div>
        );
    }
};

 export default UserPost; 