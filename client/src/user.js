

//== User Viewing Components ===================================================

//-- Dependencies --------------------------------
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {URL_USERS} from './index.js';
import List from './utilities/list.js';
import Loading from './utilities/loading.js';


//== Full List of Users ========================================================

export function UserList() {
    return (
        <div class="user-list">
            <h1>Characters from Lord of the Rings</h1>
            <List
                listUrl={URL_USERS}
                itemComponent={UserListItem}
            />
        </div>
    );
}
function UserListItem({item}) {
    // Url Details does not use URL_USERS, as URL_USERS is the _API_ url
    const urlDetails = `/users/${item.id}`;
    return (
        <Link to={urlDetails}>
            {item.name}
        </Link>
    )
}


//== Detailed User View ========================================================

export class UserViewer extends React.Component {

    //-- Lifecycle -----------------------------------
    constructor() {
        super(...arguments);
        this.state = {
            user : null ,
            ready: false,
        };
    }
    componentDidMount() {
        const userId = this.props.match.params.id;
        const urlUserData  = URL_USERS + '/' + userId;
        // Get basic User Data:
        axios.get(urlUserData)
        .then(response => {
            let data = response.data;
            this.setState({
                user : data,
                ready: true,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    //-- Rendering -----------------------------------
    render() {
        //
        const userId = this.props.match.params.id;
        const urlUserPosts = `${URL_USERS}/${userId}/posts`;
        //
        let loadingUser;
        if(!this.state.ready){ loadingUser  = <Loading />;}
        //
        return (
            <div className="user-viewer">
                {loadingUser || <UserDetails user={this.state.user} />}
                <List
                    listUrl={urlUserPosts}
                    itemComponent={Post}
                />
            </div>
        )
    }
}


//== Supplementary Components ==================================================

function UserDetails({user}) {
    return (
        <div className="user-details">
            <h1>{user.name}</h1>
        </div>
    );
}
function Post({item}){
    return (
        <div className="post">
            "{item.text}"
        </div>
    );
}
/*function NameValuePair(props) {
    return (
        <div className="pair">
            <span
                className="pair_name"
                children={props.name}
            />
            <span
                className="pair_value"
                children={` ${props.value}`}
            />
        </div>
    );
}*/
