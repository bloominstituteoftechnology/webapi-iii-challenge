import React from 'react';
import {connect} from 'react-redux';
import {addPost, fetchPosts} from '../actions/index';
import {withRouter} from 'react-router-dom';

class PostForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: '',
            userID: '',
        }
    }

    handleInput = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let newPost = {
            text: this.state.text,
            userID: this.state.userID
        };


        console.log(newPost);

        this.props.addPost(newPost);

        this.setState({
            text: '',
            userID: ''
        })
        
        setTimeout(() => {
            this.props.fetchPosts();
        }, 100);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleInput} name = 'text' type = 'text' placeholder='text' value={this.state.text} ></input>
                    <input onChange={this.handleInput} name='userID' type = 'text' placeholder='userID' value={this.state.userID}></input>
                    <button type = 'submit'>Submit Post</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posting: state.posting,
        posted: state.posted,
    }
}

export default withRouter(connect(mapStateToProps, {
    addPost,
    fetchPosts
})(PostForm));