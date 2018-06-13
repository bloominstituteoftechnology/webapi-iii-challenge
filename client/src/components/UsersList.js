import React, { Component } from 'react';

class UsersList extends Component {
    render() {
        console.log('users: ', this.props)
        return (
            <div>
                {this.props.users.map(user => {
                    return (
                        <div key={user.id}>
                            <p>{user.name}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default UsersList;