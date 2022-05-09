import React from "react";
import { useParams } from "react-router-dom";
import TopNavigation from "../TopNavigation";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MissingData from "../MissingData";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import "../../styles/BaseComponents.css";

const ArticleGrid = () => {

  const { sectionId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [articles, setArticles] = useState([]);
  const { auth } = useAuth();
  console.log("auth.token in ArticleGrid", auth.token);

  const getArticles = async () => {
    try {
    
      const response = await axiosPrivate.get("/sections/" + sectionId);
      console.log("response in ArticleGrid ", response);
      console.log("articles in ArticleGrid", response.data.articles);
      setArticles(response.data.articles);
    
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
    getArticles();
  }, [])



  return (
    <Container disableGutters maxWidth={"100%"} className="container--articles">
      {
        articles.length === 0 ? ( <MissingData /> ) 
        : (
          <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
          {articles.map((item) => (
          <Grid item key={item.articleId} xs={5} sm={5} md={4} className="box--articles">
            <Link to={`/home/articles/${item.articleId}`} className="link">
              <h4>{item.heading}</h4>
              <p>******</p>
              <p>{(item.content).length <=225 ? item.content : `${ (item.content).slice(0,225) }...`}</p>
            </Link>
          </Grid>
          ))}            
      </Grid>
        <Link to={"/home/"} className="link">
          To all subjects
        </Link>
      </>
      )
    }
  </Container>
  )
}

export default ArticleGrid