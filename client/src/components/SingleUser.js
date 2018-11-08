import React from 'react'

class SingleUser extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        user: {}   
    }
}

componentDidMount() {
    const userId = this.props.match.params.id;
    this.setState({
      user: this.props.users.find(user => user.id == userId)
    });
  }

render() {
    return (
        <div>
            
        </div>
        )
    }
}


export default SingleUser;