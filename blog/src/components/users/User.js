import React from 'react';
import { Link} from 'react-router-dom';

import { 
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

class User extends React.Component {
    state = {
        User: {},
        Posts: [],
    }
    render(){
        return (
            <Card>
                <CardBody>
                    <Link to={`/`}>Home</Link> /
                    <Link to={`/api/users`}> List of Users</Link>
                    <CardTitle className={`mt-3`}>Posts by {this.state.User.name}</CardTitle>

                    <CardText>
                        <ListGroup>
                        {this.state.Posts.map(post => <ListGroupItem key={post.id}>{post.text}</ListGroupItem>)}
                        </ListGroup>
                    </CardText>
                </CardBody>
            </Card>
        )
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        
        fetch(`http://localhost:5000/api/users/${id}`)
            .then(response => response.json())
            .then(data => {
                const user = { ...data};
                if(Number(user.id) === Number(id)){
                    fetch(`http://localhost:5000/api/users/${id}/posts`)
                        .then(response => response.json())
                        .then(posts => {
                            this.setState({
                                Posts: posts,
                                User: user,
                            })
                        });
                }
            });
    }
}

export default User;