import React from 'react';

class Characters extends React.Component {
    render() {
        return (
            <div>
                {this.props.characters.map(char => 
                    <h3 key={char.id}>{char.name}</h3>
                )}
            </div>
        )
    }
}

export default Characters; 