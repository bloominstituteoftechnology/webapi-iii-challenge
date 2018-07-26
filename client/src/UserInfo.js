import React, { Component }  from 'react';
import { Route, Link, Switch } from 'react-router-dom';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log('user info props: ', this.props.u);
        // const  id = this.props.u.id;
        // const  name = this.props.u.name;
        return ( 
            <div>
                hi
                {/* <Link to={`/users/${id}`}>
                {name}
                </Link>    */}
            </div>
         );
    }
}
 
export default UserInfo;