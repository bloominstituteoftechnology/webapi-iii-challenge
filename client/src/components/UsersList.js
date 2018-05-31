import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    // console.log(props)
    return (
        <div>
            {props.users.map((e) => {
                return (
                    <Link to={`/${e.id}`} key={e.id}>
                        <div>
                            <h4>{e.name}</h4>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
}
