import React from 'react';

const UserCard = ({ id, name }) => {
  return(
    <div className="user-card">
      <p>{name}</p>
    </div>
  );
}

export default UserCard;
