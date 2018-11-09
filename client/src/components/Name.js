import React from 'react'
import {Route} from 'react-router-dom';

const Name = props => {
    return (
        <Route render={({history}) => (
            <div onClick={() => { history.push(`/${props.user.id}`) }}>
                <h2 className='name'>{props.user.name}</h2>
            </div>
            )} 
        />
    )
}

export default Name;

