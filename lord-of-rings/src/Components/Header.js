import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return(
    <div>
      <Link to="/characters">Characters</Link>
      <Link to="/posts">Posts</Link>
    </div>
  );
}

export default Header;
