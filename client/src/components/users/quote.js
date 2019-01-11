import React from 'react';
import axios from 'axios';

class Quote extends React.Component {
    state = {
        toUpdate: false,
        text: this.props.quote.text
    }

    componentDidUpdate() {
        if(this.props.deselect){
            this.setState({toUpdate: false});
            this.props.toggleDeselect();
        }
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    toggleUpdate = (ev) => {
        this.setState({toUpdate: !this.state.toUpdate});
    }

    stageUpdate = (ev) => {
        ev.stopPropagation();
        this.setState({toUpdate: true})
    }
    
    editQuote = (ev) => {
        ev.preventDefault();
        const editBody = {
            text: this.state.text,
            userId: this.props.user.id
        }
        axios.put(`http://localhost:5000/posts/${this.props.quote.id}`, editBody)
            .then(res => {
                this.toggleUpdate();
                this.props.getQuotes();
            })
    }

    deleteQuote = () => {
        axios.delete(`http://localhost:5000/posts/${this.props.quote.id}`)
            .then(res => {
                this.toggleUpdate();
                this.props.getQuotes();
            })
    }

    stopProp = (ev) => {
        ev.stopPropagation();
    }

    render() {
        return (
            <li onClick={this.state.toUpdate? this.stopProp : this.stageUpdate}>
                {this.state.toUpdate? 
                <form onSubmit={this.editQuote}>
                    <input value={this.state.text} name='text' onChange={this.handleChange} />
                    <button type='submit'>Edit Quote</button>
                    <button onClick={this.toggleUpdate}>Cancel Update</button>
                    <button onClick={this.deleteQuote}>DELETE QUOTE</button>
                    
                </form>
                : 
                this.props.quote.text}
            </li>
        )
    }
}

export default Quote;