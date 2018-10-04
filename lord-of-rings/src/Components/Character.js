import React from 'react';
import axios from 'axios';

class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characterPosts: [],
            character: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:9000${this.props.match.url}`)
            .then(res => {
                this.setState({
                    characterPosts: res.data,
                    character: res.data[0].postedBy
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                <h2>{this.state.character} once said,</h2>
                {this.state.characterPosts.map(post => 
                    <h4 key={post.id}>"{post.text}"</h4>
                )}
            </div>
        )
    }
}

export default Character; 