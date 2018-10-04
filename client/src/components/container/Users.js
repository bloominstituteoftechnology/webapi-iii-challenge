import React from 'react';
import User from '../presentational/User';

class Users extends React.Component {

    render () {
        return (
            <div>  
                {this.props.users.map(user => <User key={user.id} user={user}/>)} 
            </div>
    )
}
}

export default Users;