import React from "react";

const UserDetails = props => {
  const user = props.users.find(user => {
    return user.id === parseInt(props.match.params.id);
  });

  if (!user) props.history.push("/users");
  const { name, id } = user ? user: {name:'', id:''};

  return (
      <div>
          <h1>{name}</h1>
          <div>
              {}
          </div>
      </div>
      

  )
};

export default UserDetails;
