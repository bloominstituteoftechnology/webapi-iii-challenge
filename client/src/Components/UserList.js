import React from 'react';
import {Link} from 'react-router-dom'; 

class UserList extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
// componentWillReceiveProps


  

  render(){
    console.log(this.props)
    console.log(this.state)
    return(
      <div>
        {this.props.users.map(user => <Link 
        key = {user.id}
        to={{pathname: `/${Number(user.id)}`, state: {id: user.id }}}
        ><div id = {user.id} key={user.id}>{user.name}</div></Link> )}
      </div>  
    )
  }
}
export default UserList; 