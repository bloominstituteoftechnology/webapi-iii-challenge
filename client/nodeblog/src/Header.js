import React, { Component } from "react";
import './index.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserList from "./UserList";

class Header extends Component {
    render() {
        return (
            <div className = "jumbo"> 
               <h1 className="display-3">Welcome to Middle Earth...</h1>
                    <Link to="/users" component={UserList}><Button className="primary">Learn More</Button></Link>
            </div>
        );
    }
}

export default Header;
