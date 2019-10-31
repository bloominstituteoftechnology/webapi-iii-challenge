import React from 'react'

const User = props => {
    
    const entryRoute = (e, item) => {
        e.preventDefault()
        props.history.push(`/${item.id}`)
    }

    if(!props.users) {
        return <div>Loading</div>
    }
    
    return(
        
        <>
            {props.users.map(item => {
                return <p key={item.id} onClick={e => entryRoute(e, item)}>
                            {item.name}
                        </p>
            })}
        </>
    )
}

export default User