import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';


class User extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  componentWillMount (){
    this.fetchPosts(this.props.location.state.id)
  }

  fetchPosts = (id) => {
    const promise = axios.get(`http://localhost:9000/api/users/${id}`)
    promise
    .then(response => {
      console.log(response.data)
      this.setState({user: response.data, loaded: true})
    })
    .catch(error => {
      console.log(error)
    })
  }

  render(){
    console.log(this.props)
    console.log(this.state)
    const {name, posts} = this.state.loaded === true ? this.state.user : {name: "Loading", posts: []}
    if (this.state.loaded === true){
      console.log(posts[0].text)
      return (
        <div>
          <h1>{name} <Link to = '/'>Home</Link></h1>
          {posts.map((post, i) => {
            return(
            <div key = {i}>
              <h3>{post.text}</h3>
            </div>)
          })}
        </div>
      )
    }
    
    return(
        <div>
          Loading...
        </div>
    )
  }
}

export default withRouter(User); 