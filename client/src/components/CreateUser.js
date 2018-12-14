import React from 'react'

import { Link } from 'react-router-dom'
//import axios from 'axios'

import UserList from './UserList'



class CreateUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            // posts: [],
            // userId: '',     //can't just add Post attributes here?
            // text: '',
        }
    }

    // componentDidMount(){
    //     axios 
    //     .get(`http://localhost:3000/api/posts`)
    //     .then(response => {
    //         this.setState({ posts: response.data })
    //     })
    //     .catch(err => {
    //         console.log("Fail to GET posts from local server", err)
    //     })
    // }

    // handleAddNewPost = post => {
    //     axios 
    //     .post(`http://localhost:3000/api/posts`, post)
    //     .then(response => {
    //             axios 
    //             .get(`http://localhost:3000/api/posts`)
    //             .then(response => {
    //             this.setState({ posts: response.data })
    //             })
    //             .catch(err => {
    //             console.log("Fail to GET posts from local server", err)
    //             })
    //     })
    //     .catch(err => {
    //         console.log("Fail to add a new Post to the server", err)
    //     })
    // }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleAddNewUser(this.state)
    }


    render(){
        return(
            <div>
                <div className="user-container">
                    <h2>Create New User</h2>
                        <form>
                            <input 
                                placeholder="user name (required)"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </form>
                        <div className="button" onClick={this.handleSubmit}><Link to="/users/create">Save</Link></div>
                </div>
                <div>
                    <UserList users={this.props.users} handleDeleteUser={this.props.handleDeleteUser}/>
                </div>
            </div>
        )
    }
}

export default CreateUser