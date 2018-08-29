import React, { Component } from 'react'
import axios from 'axios'

class UserContainer extends Component {
  constructor () {
    super()
    this.state = {
      userList: []
    }
  }

  componentWillMount () {
    axios.get(`http://localhost:8000/users`)
          .then(data => data.data)
          .then(data => this.setState({ userList: data }))
          .catch(error => console.error(error))
  }

  render () {
    return (
      <div>
        { this.state.userList.length !== 0 ?
            JSON.stringify(this.state.userList) :
            <p>User List is empty</p>
        }
        <button>Add</button>
        <button>Delete</button>
        <button>Update</button>
      </div>
    )
  }
}

export default UserContainer