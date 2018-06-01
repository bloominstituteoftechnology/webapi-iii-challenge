import React  from "react";

const Post = props => {
    return(
        <div className="user">
            <h4>{props.params.id.name}</h4>
        </div>    
    );
}

export default Post;