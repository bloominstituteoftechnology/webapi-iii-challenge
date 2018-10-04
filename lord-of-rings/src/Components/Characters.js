import React from 'react';
import { Link } from 'react-router-dom';

class Characters extends React.Component {
    render() {
        return (
            <div>
                {this.props.characters.map(char => 
                    <h3 key={char.id}><Link to={`/user/${char.id}`}>{char.name}</Link></h3>
                )}
            </div>
        )
    }
}

export default Characters; 