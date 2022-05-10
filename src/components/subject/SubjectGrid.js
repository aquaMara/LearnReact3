import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MissingData from "../MissingData";
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

export default SubjectGrid

  