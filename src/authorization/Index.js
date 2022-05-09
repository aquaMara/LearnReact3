import React from "react";
import Login from "./Login";
import Registration from "./Registration";
import { Link } from "react-router-dom";
// import im from "D:/iTechArtImages/subject_images/math.png";
import im2 from "../images/math.png";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Typography, Button } from "@mui/material";

function Index() {
  return (
    <Container disableGutters maxWidth={"100%"} className="container--subjects">
        <Typography className="top-navigation--text" variant="h3" component="div" sx={{ flexGrow: 1, padding: 0, color: "#7015a5"}}>
          Welcome to our website!
        </Typography>
        <Box>
          <Typography className="top-navigation--text" variant="h6" component="div" sx={{ flexGrow: 1, padding: 0, color: "#7015a5"}}>
            It is a platform for online learning.<br/>
            If you are a teacher you can register to upload your material and become a tutor in future.<br/>
            As a student, you'll get access to a lot of material on different topics. You can also contact authors of the material if you want to continue working with them personally.<br/>
          </Typography>
          <div>
            <Button><Link to="/login" className="link">Login</Link></Button>
            <Button><Link to="/register" className="link">Registration</Link></Button>
          </div>
        </Box>
    </Container>
  )
}
// const fileName = "math"
// <img src={require("../images/" + fileName + ".png")} />
// <img src={require(`../images/${fileName}.png`)} />
// <img src={im2} alt="ghgh" />

export default Index