import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PostCard = props => {
    const [postData, setPostData] = useState([]);

    useEffect(()=> {
        axios.get(`http://localhost:9000/api/post/`)
        .then(res=> {
            console.log('List of all Posts', res.data)
            const allPostData = res.data.filter( post => { 
                if(props.id === post.user_id){
                    return post;
                }});
            setPostData(allPostData);
        })
        .catch(err=> {
            console.log(err);
        })
    }, [])

    return(
        <div>
            <Row>
                <p>Test text.</p>
            </Row>
            <Row>
                <p>Test text.</p>
            </Row>
            {postData.map(post=> (
                <Row>
                    <p>{post.text}</p>
                </Row>
            ))}
        </div>
    )
}

const Row = styled.div`
    border-bottom: 1px solid gray;
    padding: 2px;
    color: gray;
    margin-bottom: 2px;
    p{
        padding-top: 2px;
        margin: 0;
    }
`;

export default PostCard;