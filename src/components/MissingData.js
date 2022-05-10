import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
// rafc rafce

const MissingData = () => {

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <h2>No data found</h2>
      <p>Well, that's disappointing</p>
      <p>
        <Link to={"/home"} className="link">
          <Button>Visit Our Homepage</Button>
        </Link>
        <Button onClick={goBack}>Go Back</Button>
      </p>
    </div>
  )
}

export default MissingData