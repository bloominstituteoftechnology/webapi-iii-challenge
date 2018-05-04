import React from 'react';
import axios from 'axios';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      id: this.props.match.params.id
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/users/${this.state.id}`).then(res => {
      this.setState({userInfo: res.data.response})
    }).catch(err => console.log(err))
  }

  render() {
    if (this.state.userInfo.length === 0) {
      return "loading..."
    }
    return (<div>
      <h1>
        User id: {this.state.userInfo[0].postedBy}</h1>
      {
        this.state.userInfo.map(info => {
          {
            console.log('inside map...', info)
          }
          return (
            <ul>
            <li className="list">
              {info.text}
            </li>
          </ul>)
        })
      }
    </div>)
  }
}


export default UserInfo;
