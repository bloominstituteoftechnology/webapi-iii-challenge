import React from "react";

import "../../css/allUserCards.css";

const AllUserCards = props => {
  console.log("AlluserCardsProps", props);
  return (
    <div className="allUsersWrapper">
      {props.users.map(user => {
        return (
          <div className="singleUserCard" key={user.id}>
            <h2>{user.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default AllUserCards;
