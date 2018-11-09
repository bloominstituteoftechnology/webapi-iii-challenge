import React from 'react';


function Userlist(props) {
  return (
    <div className='user-list'>
      {props.users.map(user => (
        <div className='user'>
          <h2 className='name'>{user.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Userlist;