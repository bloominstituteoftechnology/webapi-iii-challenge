import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUserPosts} from '../actions';

class UserDetails extends React.Component {

    componentDidMount(){
        let userID = this.props.match.params.id;
        this.props.fetchUserPosts(userID);
        console.log(this.props.match.params.id)
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                This is the user details view
                {this.props.userPosts.map(post => {
                    return (
                        <div>
                            <h1>{post.postedBy}</h1>
                            <p>{post.text}</p>
                            </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        userPosts: state.userPosts
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchUserPosts
})(UserDetails));