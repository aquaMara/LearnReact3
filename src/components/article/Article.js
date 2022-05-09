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
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import Author from "../appuser/Author";
import "../../styles/BaseComponents.css";

const Article = () => {

  const { articleId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [article, setArticle] = useState([]);
  const [author, setAuthor] = useState();
  const { auth } = useAuth();
  console.log("auth.token in Article", auth.token);

  const getArticle = async () => {
    try {
    
      const response = await axiosPrivate.get("/articles/" + articleId);
      console.log("response in Article ", response);
      console.log("articles in Article", response.data);
      setArticle(response.data);
    
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
    getArticle();
  }, [])

  const handleClick = async () => {

  }


  return (
    <Container disableGutters maxWidth={"100%"} className="container--article">
        {article && 
          <Card sx={{ maxWidth: "90%" }} className="container--article--card">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className="article--heading">
              {article.heading}
            </Typography>
            
            <div className="article--info">
              {article.literature && 
              <>
                <Typography gutterBottom variant="h7" className="article--info--element">Literature: </Typography>
                <Typography gutterBottom variant="h8" className="article--info--element">{article.literature}</Typography><br/>
              </> 
              }
              {article.link &&
              <>
                <Typography gutterBottom variant="h7" className="article--info--element">Link: </Typography>
                <Typography gutterBottom variant="h8" className="article--info--element">{article.link}</Typography><br/>
              </>
              }
              {article.userId && <Author userId={article.userId}/>}
            </div>

            <div className="article--content">
              <Typography variant="body1" color="text.secondary" className="article--content">
                {article.content}
              </Typography>
            </div>
          </CardContent>
        </Card>
        }
        {!article && <MissingData />}
    </Container>
  )
}

export default Article
/*
<CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
*/