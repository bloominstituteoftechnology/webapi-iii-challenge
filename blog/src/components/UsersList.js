import React from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions/index';
import {withRouter, Link} from 'react-router-dom';
import User from './User';
import UserForm from './UserForm';

class UsersList extends React.Component {

    componentDidMount(){
        this.props.fetchUsers();
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <UserForm />
                {this.props.users.map(user => {
                    return <Link to={`/users/${user.id}`} key={user.id}><User {...user} /></Link>
                })}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchUsers
})(UsersList));