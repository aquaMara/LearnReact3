import React from "react";
import Post from "./Post";

function Feed({ users }) {
    const array = users.map(item => 
        (<Post key={item.id} item={item} />)
        );
  return (
    <>
        {array}
    </>
  )
}

export default Feed