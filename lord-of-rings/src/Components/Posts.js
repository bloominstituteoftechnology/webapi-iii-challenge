import React from 'react';

class Posts extends React.Component {
    render() {
        return (
            <div>
                {this.props.posts.map(post => 
                    <h5 key={post.id}>{post.text}</h5>
                )}
            </div>
        )
    }
}

export default Posts; 