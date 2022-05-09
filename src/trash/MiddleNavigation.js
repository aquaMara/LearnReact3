import React from "react";
import { Box } from "@mui/system";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import "../styles/Home.css";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Subject from "./subject/Subject";
import Subjects from "../components/subject/SubjectGrid";
import SubjectLine from "./SubjectLine";

function MiddleNavigation() {

  // console.log("auth in account", auth.username);

  return (
    <div className="j">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar  className="top-navigation">
            <SubjectLine />
          </Toolbar>
        </AppBar>
      </Box>

    </div>
  )
}

export default MiddleNavigation