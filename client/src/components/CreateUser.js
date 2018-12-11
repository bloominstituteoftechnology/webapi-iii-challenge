import React from 'react'

import { Link } from 'react-router-dom'

class CreateUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            // userId: '',     //can't just add Post attributes here?
            // text: '',
        }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleAddNewUser(this.state)
    }


    render(){
        return(
            <div className="user-container">
                <h2>Create New User</h2>
                    <form>
                        <input 
                            placeholder="user name (required)"
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </form>
                    <div className="button" onClick={this.handleSubmit}><Link to="/users/">Save</Link></div>
            </div>
        )
    }
}

export default CreateUser