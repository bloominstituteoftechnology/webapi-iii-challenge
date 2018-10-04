import React from 'react';
import {fetchSinglePost, deletePost} from '../actions';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

class PostDetails extends React.Component {
    componentDidMount(){
        this.props.fetchSinglePost(this.props.match.params.id);
    }

    handleDelete = (event) => {
        event.preventDefault();

        console.log(this.props.match.params.id);
        this.props.deletePost(this.props.match.params.id);
    
        setTimeout(() => {
            this.props.history.replace('/');
        }, 100);
       
        
    }

    render(){
        return(
            <div>
                <h1>{this.props.currentPost.postedBy}</h1>
                <p>{this.props.currentPost.text}</p>
                <button onClick={this.handleDelete}>DELETE</button>
                <Link to = {`/posts/edit/${this.props.currentPost.id}`}><button>EDIT</button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetching_single: state.fetching_single,
        fetched_single: state.fetched_single,
        currentPost: state.currentPost,
        deleting: state.deleting,
        deleted: state.deleted
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchSinglePost,
    deletePost,
})(PostDetails));
