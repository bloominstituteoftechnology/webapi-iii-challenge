import React from 'react'

const User = props => {
    // const userId = props.user.find(item => `${item.id}` === props.match.params.id)
    const entryRoute = (e, item) => {
        e.preventDefault()
        props.history.push(`/${item.id}`)
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