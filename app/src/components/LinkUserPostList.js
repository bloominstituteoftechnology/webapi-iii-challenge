import React from "react";
import LinkUserPost from "./LinkUserPost";
import axios from 'axios';

class LinkUserPostList extends React.Component {
  state = {
    postedBy: '',
    postedByError: null,
    showForm: false,
  }
  componentDidMount() {
    const id = window.location.href.split('/')[4]
    axios
      .get(`http://localhost:9000/users/${id}/`)
      .then(user => this.setState({postedBy: user.data}))
      .catch(err => this.setState({postedByError: err}));
  }
  render() {
    return (
      <div style={{position: 'relative', background: 'lightgreen'}}>
        <h4 style={{padding: '50px 0 0 0'}}>Author: {this.state.postedBy.name}</h4>
        {this.props.location.state.userPosts.map(userPost => {
          return (
            <div key={userPost.id}>
              <LinkUserPost  userPost={userPost} />
            </div>
          )
        })}
        <button style={{background: 'black', color: 'white', fontWeight: 'bold', borderRadius: '3px', padding: '10px 20px', fontSize: '16px', width: '100%', cursor: 'pointer'}} onClick={() => {this.props.history.goBack()}}>Go Back</button>
      </div>
    );
  }
}

export default LinkUserPostList;
