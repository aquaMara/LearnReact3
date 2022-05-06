import React from "react";
import { Link } from "react-router-dom";
// rafc rafce

const MissingData = () => {
  return (
    <div>
      <h2>No data found</h2>
      <p>Well, that's disappointing</p>
      <p>
        <Link to={"/home"} className="link">Visit Our Homepage</Link>
      </p>
    </div>
  )
}

export default MissingData