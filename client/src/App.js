import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import { connect } from "react-redux";
import { fetchUsers } from "./store/actions";
import UserList from "./components/UserList";

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Blog
        </header>
        <div>
          <h2>User List</h2>
          <UserList {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.userList,
    fetchUsers: state.fetchingUsers
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUsers
  }
)(App);
