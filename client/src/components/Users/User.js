import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      user_id: '',
      name: ''
    };
  }

  componentDidMount = () => {
    axios
      .get(
        `http://localhost:3333/api/users/posts/${this.props.match.params.id}`,
      )
      .then(res => {
        this.setState({
          userPosts: res.data.post,
          user_id: this.props.match.params.id,
          name: res.data.post[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="userPosts">
        
        {!this.state.userPosts.length > 0 ? (<div className='loader'><h2>...Loading</h2> <p> User has no content... Try Again.</p></div>
        ) : (
          <div style={{width: '100%', position: 'relative', paddingTop: "50px"}}>
          <Link
          style={{ position: 'absolute', right: '20px', top: '20px' }}
          to="/"
        >
          Back to List
        </Link>
              <h2 style={{textAlign: 'center', paddingBottom: '20px'}}> {this.state.name.postedBy}</h2>
            {this.state.userPosts.map(post => {
              return (
                  <ul key={post.id}>
                    <li>
                      <p>
                        <strong>{post.postedBy}: </strong> {post.text}
                      </p>
                    </li>
                  </ul>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default User;
