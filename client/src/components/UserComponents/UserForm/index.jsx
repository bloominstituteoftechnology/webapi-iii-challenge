import React from "react";
import "./index.css";

const UserForm = props => {
  const heading = props.type === "new" ? "Create New User:" : "Edit User:";
  const buttonName = props.type === "new" ? "Save" : "Update";

  return (
    <div className="main-container form">
      <h2>{heading}</h2>
      <form>
        <input
          type="text"
          name="user"
          maxLength="20"
          placeholder="User Name"
          value={props.title}
          onChange={props.handleInputChange}
        />
        <button onClick={props.handleFormSubmit}>{buttonName}</button>
      </form>
    </div>
  );
};

export default UserForm;
