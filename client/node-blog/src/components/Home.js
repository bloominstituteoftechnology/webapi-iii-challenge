import React from 'react';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {

  componentDidMount() {
    this.props.isAtHomeHandler()
  }

  componentWillUnmount() {
    this.props.isAtHomeHandler()
  }

  render() {
    return (
      <main>
        <h1>Welcome</h1>
        <NavLink to="/users">Enter</NavLink>
      </main>
    );
  }
}

export default Home;