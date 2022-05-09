import React from "react";
import { Link } from "react-router-dom";

const Subject = ( {item} ) => {
  return (
    <div className="subject" key={item.id}>
        <Link to={`/home/subject/${item.subjectId}`}>
          <img src={require(`../images/${item.filePath}`)} alt="pic" width={60} />
          <h4>{item.subjectName}</h4>
        </Link>
    </div>
  )
}

export default Subject
