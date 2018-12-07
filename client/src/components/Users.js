import React from "react";
import { Link } from "react-router-dom";

const Users = props => {
  return (
    <div>
      {props.users.map(user => {
        return <h3 key={user.id}><Link to={`/${user.id}`}>{user.name}</Link></h3>
    })}
    </div>
    
  )
}

export default Users;