import React from 'react';

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    };
    componentDidMount(){
        this.getUsers("http://localhost:9000/users");
      };
    getUsers = URL => {
        fetch(URL)
            .then( res => {
            return res.json();
            })
            .then( data => {
            this.setState({ users: data });
            })
            .catch(err => {
            console.log(err)
            });
    };
    render(){
    return (
        <div>
            {this.state.users.map( user => {
                return (
                    <div key={user.id}>
                        <p>User ID: {user.id}</p>
                        <p>Username: {user.name}</p>
                    </div>
                )
            })}
        </div>
        );
    };
};


export default Users;