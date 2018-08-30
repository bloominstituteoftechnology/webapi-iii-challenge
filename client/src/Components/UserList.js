import React from 'react';


class UserList extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div>
          {this.props.users.map(user => <div key={user.id}>{user.name}</div> )}
      </div>  
    )
  }
}
export default UserList; 