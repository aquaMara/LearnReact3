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
import { Typography, Rating } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import Author from "../appuser/Author";
import "../../styles/BaseComponents.css";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useNavigate } from "react-router-dom";

const Article = () => {

  const { articleId } = useParams();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const axiosPrivate = useAxiosPrivate();
  const [article, setArticle] = useState([]);
  const [author, setAuthor] = useState();
  const [score, setScore] = useState();
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

  const handleScoreChange = async (event, score) => {
      console.log("score", score);
      console.log("event", event);
      try {
    
        const response = await axiosPrivate.put(`/articles/rating/${articleId}`, null,
          { params: { "score": score }, } 
        );
        console.log("response in Article ", response);
        console.log("articles in Article", response.data);
        setArticle(response.data);
      
      } catch (err) {
        if (!err?.response) {
          console.log("No error response");
        } else if(err.response?.status === 403) {
          console.log("Invalid username or password");
        } else if(err.response?.status === 500) {
          console.log("Unauthorized");
        } else {
          console.log(`error : ${err.message}`)
        }
      }
  }
/*
{article.rating &&
                <Rating name="simple-controlled" value={article.rating} 
                onChange={(event, ratingMark) => { setValue(ratingMark); }}/>
              }

*/
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  return (
    <Container disableGutters maxWidth={"100%"} style={{height: "100vh"}}  className="container--article">
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
              {
                auth.role === "ROLE_STUDENT" &&
                (<>
                  <StyledRating precision={1}
                  value={article.rating} onChange={(event, score) => { handleScoreChange(event, score) }}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
                </>)
              }
              
            </div>

            <div className="article--content">
              <Typography variant="body1" color="text.secondary" className="article--content">
                {article.content}
              </Typography>
            </div>
          </CardContent>
          <Button onClick={goBack}>Go Back</Button>
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

          <Rating name="half-rating" precision={0.5} defaultValue={2.5} value={article.rating} 
                  onChange={(event, score) => { handleScoreChange(event, score) }}/>
*/