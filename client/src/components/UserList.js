import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';



class UserList extends Component {
  constructor(){
    super();

    this.state = {
      users : [{name: 'initial'}]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/users')
    .then(res => {
      // console.log(res)
      this.setState({users: res.data.response});
      // console.log('after cdm state...', this.state);
    })
    .catch(err => console.log(err));
  }

  render(){
    // console.log('userList ...')
    return (
      <div >
      <ul>
      {this.state.users.map(user =>  <Link to={`users/${user.id}`}><li className="list">{user.name} </li></Link>)}
      </ul>
    </div>
    )
  }

}

export default UserList;
