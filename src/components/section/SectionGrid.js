import React from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MissingData from "../MissingData";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "../../styles/BaseComponents.css";

const SectionGrid = () => {
  const { subjectId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);
  const { auth } = useAuth();
  console.log("auth.token in SectionGrid", auth.token);

  const getSections = async () => {
    try {
    
      const response = await axiosPrivate.get("/subjects/" + subjectId);
      console.log("response in SectionGrid ", response);
      console.log("sections in SectionGrid", response.data.sections);
      setSections(response.data.sections);
    
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
    getSections();
  }, [])

  const arr = sections.map(item => <p key={item.sectionId}>Name: {item.articles}</p>)
  console.log(arr);

  return (
    <Container disableGutters maxWidth={"100%"} className="container--sections">
      {
        sections.length === 0 ? ( <MissingData /> ) 
        : (
          <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
          {sections.map((item) => (
          <Grid item key={item.sectionId} xs={3} sm={3} md={2} className="box--sections">
            <Link to={`/home/sections/${item.sectionId}`} className="link">
              <h4>{item.sectionName}</h4>
            </Link>
          </Grid>
          ))}            
        </Grid>
        <Link to={"/home/"} className="link">
          <Button>To all subjects</Button>
        </Link> 
       </>
      )
    }
    
  </Container>
  )
}

export default SectionGrid
