import React from 'react'

import { Link } from 'react-router-dom'

class CreatePost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: '',     
            text: '',
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit2 = event => {
        console.log(this.props)
        event.preventDefault();
        this.props.handleAddNewPost(this.state)
    }


    render(){
        return(
            <div className="user-container">
                <h2>Create New Post</h2>
                    <form>
                        <input 
                            placeholder="user's Id (required)"
                            type="number"
                            name="userId"
                            value={this.state.userId}
                            onChange={this.handleChange}
                        />
                         <input 
                            placeholder="post's text (required)"
                            type="text"
                            name="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </form>
                <div className="button" onClick={this.handleSubmit2}><Link to="/posts/">Save</Link></div>
            </div>
        )
    }
}

export default CreatePost