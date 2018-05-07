import React, { Component } from 'react'
import axios from 'axios'


class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }
  fetchingPosts = () => {
    axios.get('http://localhost:5000/posts?pass=mellon')
      .then(response => {
        console.log('posts', response)
        this.setState({ posts: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }
  componentDidMount = () => {
    this.fetchingPosts()
  }


  render() {
    console.log('hilal', this.state.posts)


    const { posts } = this.state
    return (

      <div>
        {posts
          .filter((post, bill) => {
            console.log('fil', this.props.match.params.id);

            console.log('userid', post.userId)

            return post.userId == this.props.match.params.id;



          }).map(p => { return (<div>{p.text}</div>) })
        }
      </div>
    )
  }



}
export default PostList;