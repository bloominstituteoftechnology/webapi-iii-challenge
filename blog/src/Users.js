import React from 'react'

 const Users = props => {
    return (
        <div>
            {props.users.map(user => {
                return (
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
 export default Users;