import React from "react";
import axios from "axios";

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            posts: [],
        }
    }

    componentDidMount() {
        const name = this.props.match.params.id;
        this.setState({ name: name });
        setTimeout(() => {
            this.fetchPosts(this.state.name);
        }, 70);
    }

    // componentDidUpdate(prevState) {
    //     if(this.state.value !== prevState) {
    //         this.fetchPosts(this.state.name);
    //     }
    //     return false;
    // }

    fetchPosts = (name) => {
        const id = this.props.users.filter(user => user.name === name)[0].id;
        console.log(id);
        axios.get(`http://localhost:5000/api/users/${id}/posts`)
            .then(response => {
                this.setState({
                    posts: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
            return(
                <div className="user">
                    <h4>{this.state.name}</h4>
                    {this.state.posts.map(post => {
                        return(
                            <div key={post.id} className="post">
                                <p>{post.text}</p>
                            </div>
                        );
                    })}
                </div>    
            );
    }
}

export default User;