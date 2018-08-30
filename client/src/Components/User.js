import React from 'react';


class User extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    console.log(this.props)
    return(
        <div>Test</div>
    )
  }
}

export default User; 