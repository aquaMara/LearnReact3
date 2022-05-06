import React from "react";
import { Box } from "@mui/material";
import Subjects from "../components/admin/Subjects";
import AddSubject from "../components/admin/subject/AddSubject";
import { Typography } from "@mui/material";

const Admin = () => {
  return (
    <Box sx={{width: "100vw", height: "100vh", backgroundColor: "white"}}>
      <Typography style={{padding: "1%", margin: "1%", color: "#7015a5", backgroundColor: "#9dd0ea"}}>
            Create subject
      </Typography>
      <AddSubject />
      <Subjects />
    </Box>
  )
}

export default Admin