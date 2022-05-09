import React from "react";
import TopNavigation from "../TopNavigation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MissingData from "../MissingData";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import "../../styles/BaseComponents.css";

const SubjectGrid = () => {

    const axiosPrivate = useAxiosPrivate();
    const [subjects, setSubjects] = useState([]);
    const { auth } = useAuth();
    console.log("auth in home", auth.token);

    const getSubjects = async () => {
        try {
    
            const response = await axiosPrivate.get("/subjects");
            console.log("response in subjects ", response);
            setSubjects(response.data);
    
        }  catch (err) {
            if (!err?.response) {
                console.log("No error response");
            } else if(err.response?.status === 403) {
                console.log("Invalid username or password");
            } else if(err.response?.status === 500) {
                console.log("Unauthorized");
            } else {
                console.log("Login failed")
            }
        }
    }
    
    useEffect(() => {
        getSubjects();
    }, [])

    return (
      <Container disableGutters maxWidth={"100%"} className="container--subjects">
      {
        subjects.length === 0 ? ( <MissingData /> ) 
        : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
            {subjects.map((item) => (
            <Grid item key={item.subjectId} xs={4} sm={4} md={3} className="box--subjects">
              <Link to={`/home/subjects/${item.subjectId}`} className="link">
              { item.filePath && <img src={require(`../../images/${item.filePath}`)} alt="pic" width={60} /> }
                <h4>{item.subjectName}</h4>
              </Link>
            </Grid>
            ))}            
        </Grid>
        )
      }
    </Container>
  )
}
// xs={{backgroundColor: "#fdcdbd"}} 
export default SubjectGrid
/*
#ddd5ec purple
    background-color: #c7e2d9;
    background-color: #ddebea;
    /* background-color: #e8ccff; */
    /* background-color: #8cb6a8; */
    /* background-color: #fdcdbd; */
    /* background-color: #dfc9e2; */
    /* background-color: #9dd0ea; */
    /* background-color: #459ec9; */
    /* background-color: #be7bb8; */
    /* background-color: #be7bb8; */
    /* background-color: #cdd1fd; */
    /* background-color: #b8eac7; */
    /* background-color: #9cd0b3; */
    /* background-color: #c3f1d3;
/*

return (
      <>
      {
        subjects.length === 0 ? ( <MissingData /> ) 
        : (
        <Box>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
            <Grid item xs={2} sm={2} md={3}>
            {subjects.map((item) => (<Subject key={item.id} item={item} />))}
            </Grid>
            
          </Grid>
          
        </Box>
        )
      }
    </>
  )
  */

  