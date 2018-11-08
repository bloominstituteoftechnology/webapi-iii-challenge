import React from 'react';


const User = props => {
  return (
    <div className='user'>
    <h3>{props.user.name}</h3>
    </div>
  )
}

export default User;
