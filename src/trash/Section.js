import React from "react";
import { Link } from "react-router-dom";

const Section = ( {item} ) => {
  return (
    <div className="section" key={item.id}>
        <Link to={`/section/${item.sectionId}`}>
          <h4>{item.sectionName}</h4>
        </Link>
    </div>
  )
}

export default Section