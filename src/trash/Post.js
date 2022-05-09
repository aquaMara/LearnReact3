import React from "react";
import { Link } from "react-router-dom";

function Post({ item }) {
  return (
    <article className="post">
        <Link to={`/post/${item.id}`}>
            <h2>{item.name}</h2>
            <p className="postDate">{item.username}</p>
        </Link>
        
    </article>
  )
}

export default Post