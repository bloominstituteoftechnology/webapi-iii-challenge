import React from 'react';

const UserItem = props => {

  const gotoUserView = () => {
    window.location.href = `users/${props.note.id}`;
  };

  return (
    <li className="user-item" onClick={gotoUserView}>
      <span className="user-item__name">{props.user.name}</span>
    </li>
  );
};

export default UserItem;