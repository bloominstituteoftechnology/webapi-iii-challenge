import React, { useEffect, useState} from 'react'
import axios from 'axios'

const Posts = props => {
    const [post, setPosts] = useState()
    
    let userId = Number(props.match.params.id)
    
    useEffect(() => {
        axios
          .get(`http://localhost:5000/users/${userId}/posts`)
          .then(res => {
            setPosts(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }, [])

      if(!post) return <div>Loading</div>
    
    return(
        <>
            {post.map(item => {
                return  <p>
                            {item.text}
                        </p>
            })}
        </>
    )
}

export default Posts