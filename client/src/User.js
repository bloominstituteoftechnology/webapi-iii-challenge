import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = (props) => {
  const { name, postArr } = props.location.state;
  console.log("User.js postArr:",postArr);
  return (
    <article style={{width:"64rem"}} className="center hidden ba mv4">
      <h1 className="f4 bg-near-black white mv0 pv2 ph3">{name}</h1>
      <Link to="/" style={{styleDecoration:"none",color:"black"}} className="mt3 ml5 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Go Back</Link>
      <ul className="center pa3r">
      {
        postArr.map(obj => {
          return (
            <li className="center mv1 pv1 f5 f4-ns lh-copy measure">
              {obj.text}
            </li>
          );
        })
      }
      </ul>
  </article>  
  );
};

export default User;