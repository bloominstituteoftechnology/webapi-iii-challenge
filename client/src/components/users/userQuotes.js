import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Quote from './quote';

class UserQuotes extends React.Component {
    state = {
        quotes: [],
        newQuote: ''
    }

    componentDidMount() {
        this.getQuotes();
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    getQuotes = () => {
        axios.get(`http://localhost:5000/users/${this.props.user.id}/posts`)
        .then(res => {
            this.setState({ quotes: res.data})
        })
        .catch(err => console.log(err));
    }

    addQuote = (ev) => {
        ev.preventDefault();
        const postBody = {
            userId: this.props.user.id,
            text: this.state.newQuote
        }
        axios.post(`http://localhost:5000/posts`,postBody)
            .then(res => {
                this.getQuotes();
                this.setState({newQuote: ''})
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <QuoteHolder>
                {this.state.quotes.map(quote => (<Quote quote={quote} user={this.props.user} getQuotes={this.getQuotes} deselect={this.props.deselect} toggleDeselect={this.props.toggleDeselect}/>))}
                <li>

                <form onSubmit={this.addQuote}>
                    <input name="newQuote" value={this.state.newQuote} placeholder='add quote...'   onChange={this.handleChange} />
                    <button type='submit'>Add Quote...</button>
                </form>
                </li>
            </QuoteHolder>
        )
    }
}

const QuoteHolder = styled.ul`
    max-width: 500px;
    margin: 0 auto;
    text-align: left;
    color: lightblue;
    font-style: italic;
    padding: 0 0 0 100px;
    box-sizing: border-box;

    li {
        margin: 10px;
        cursor: pointer;
        padding-left: 10px;
        
        &:hover {
            box-shadow: 0 0 10px 0px lightblue;
        }
    }

    input {
        width: 270px;
        margin-bottom: 20px;
    }

    button {
        cursor: pointer;

        &:hover {
            background: lightblue;
            color: black;
        }
        &:active {
            background: black;
            color: white;
        }
    }
`
export default UserQuotes;