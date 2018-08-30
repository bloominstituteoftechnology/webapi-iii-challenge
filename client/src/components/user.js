import React from 'react';
import {Link} from 'react-router-dom';
const User=(props)=><div className='card'><Link to={`/users/${props.data.id}`}><p>{props.data.name}</p></Link></div>

export default User;
