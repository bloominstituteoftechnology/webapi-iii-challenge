import React from 'react';
import '../App.css';
import axios from 'axios';

class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  componentDidMount() {
    console.log("View Note thing", this.props.match.params.id);
    axios.get(`http://localhost:8000/api/users/${this.props.match.params.id}`)
    .then(response => {
      this.setState({name: response.data.name})
    })
    .catch(err => {
      console.log("ERR:", err)
    })
  }

  render() {
    return (
      <div>
      <button onClick={() => {this.props.history.push('/')}}>Go Home</button>
      <h1 className="user-title">{this.state.name}</h1>
      </div>
    )
  }
}

export default ViewUser;
