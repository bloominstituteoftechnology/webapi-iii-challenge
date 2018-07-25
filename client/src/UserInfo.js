import React, { Component }  from 'react';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log(this.props)
        return ( 
            <div>
                {this.props.match.params.id}    
            </div>
         );
    }
}
 
export default UserInfo;