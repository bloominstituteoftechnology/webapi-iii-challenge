import React, { Component } from 'react';

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav className="Nav">
        <div className="Container">
          <i className="fab fa-facebook-square" />
          <input type="text" />
          <div className="Nav-User">
            <i className="fas fa-user" /> Frodo
          </div>
          <div>Home</div>
          <div>Create</div>
          <i className="fas fa-user-friends" />
          <i className="fas fa-comment" />
          <i className="fas fa-bell" />
          <i className="fas fa-question-circle" />
          <i className="fas fa-caret-down" />
        </div>
      </nav>
    );
  }
}

export default Nav;
