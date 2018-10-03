import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const LinkedDiv = styled.div`
	text-align: center;
	padding: 30px 0;
	border: solid black 1px;
	margin: 30px 20%;
	background-color: #dcdcff;
	> h2 {
		font-size: 2rem;
		margin-bottom: 10px;
	}
	> div > p {
		font-size: 1.2rem;
		line-height: 2.5;
	}
`;

const LinkBack = styled.p`
	text-align: center;
	font-size: 3rem;
	color: blue;
	margin-bottom: 20px;
`

const PostForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 400px;
	margin: 20px auto;
`

const ErrorPost = styled.p`
	text-align: center;
	color: red;
	font-size: 1.4rem;
	margin-bottom: 20px;
`

const DeleteSpan = styled.span`
	border: solid red 1px;
	color: red;
`;

const Blackb = styled.div`
	border: solid black 1px;
	margin: 10px 20%;
`

const EditBTN = styled.button`
	margin-bottom: 10px;
`

class LinkedUser extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			postsOwner: '',
			usersPosts: [],
			error: '',
			postText: '',
		};
	}

	componentDidMount() {
		const userId = this.props.match.params.id;
		this.fetchUsersPosts(userId)
		this.getPostsOwner(userId);
	}

	fetchUsersPosts = id => {
		axios
			.get(`http://localhost:5555/api/users/${id}/posts`)
			.then(response => {
				this.setState({
					usersPosts: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	getPostsOwner = id => {
		axios
		.get(`http://localhost:5555/api/users/${id}`)
		.then(response => {
			this.setState({
				postsOwner: response.data.name
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	createPost = (event) => {
		event.preventDefault()
		const newPost = {
			text: this.state.postText,
		}
		axios
			.post(`http://localhost:5555/api/users/${this.props.match.params.id}/posts`, newPost)
			.then(response => {
				this.setState({
					postText: '',
					error: '',
				})
				this.fetchUsersPosts(this.props.match.params.id)
			})
			.catch(error => {
				this.setState({
					error: error.response.data.msg
				})
			})
	}

  deletePost = (id) => {
		axios
			.delete(
				`http://localhost:5555/api/post/${id}`
			)
			.then(response => {
				console.log(response)
				console.log(this.props.match.params.id)
				this.fetchUsersPosts(this.props.match.params.id)
			})
			.catch(err => console.log(err));
	}

	render(){
		console.log(this.props)
		console.log(this.state.usersPosts)
		return (
			<div>
				<LinkedDiv>
					<h2>{`${this.state.postsOwner}'s Posts`}</h2>
					{this.state.usersPosts.map(userPost => (
						<Blackb key={userPost.id}>
							<p>- {userPost.text} <DeleteSpan onClick={ () => {this.deletePost(userPost.id)}}>X</DeleteSpan></p>
						</Blackb>
					))}
				</LinkedDiv>
				<PostForm>
					<input
						type="text"
						name="postText"
						value={this.state.postText}
						placeholder="Create Post"
						onChange={this.handleChange}
					/>
					<button onClick={this.createPost}> Create Post</button>
				</PostForm>
				<ErrorPost>{this.state.error}</ErrorPost>
				<Link to="/users"><LinkBack>Back To Userlist</LinkBack></Link>
			</div>
		)
	}
}
export default LinkedUser
