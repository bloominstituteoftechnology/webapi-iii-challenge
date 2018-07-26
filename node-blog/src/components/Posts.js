import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from './../actions';


class Posts extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
    return (
        <div>
            <h1>working</h1>
            {this.props.posts.map(post => {
                return <div key={post.id}>{post.text}</div>
            })}
            </div>
    )
}
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

const mapActionsToProps = {
    getPosts: getPosts
}

export default connect( mapStateToProps, mapActionsToProps )(Posts);