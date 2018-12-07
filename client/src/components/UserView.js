import React from 'react'
import axios from 'axios'

class UserView extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
        }
    }

    componentDidMount(){
        const id = this.props.user.id
        axios 
        .get(`http://localhost:3000/api/users/${id}`)
        .then(response => {
            const {name} = response.data[0]
            this.setState({ name })
        })
        .catch(err => {
            console.log("Fail to get individual user", err)
        })
    }

    render(){
        console.log(this.props)
        return (
            <div>
                <p>{this.props.user.name}</p>
            </div>
        )
    }
}

export default UserView