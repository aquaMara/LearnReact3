import React from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import MissingData from "../MissingData";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../../styles/BaseComponents.css";

import { useNavigate } from "react-router-dom";

const ArticleGrid = () => {

  const { sectionId } = useParams();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

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

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  return (
    <Container disableGutters maxWidth={"100%"} style={{height: "100vh"}} className="container--articles">
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
              <StyledRating
                name="customized-color" defaultValue={1} precision={0.5}
                value={item.rating} readOnly
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Link>
          </Grid>
          ))}            
      </Grid>
        <Button onClick={goBack}>Go Back</Button>
        <Link to={"/home/"} className="link">
          <Button>To all subjects</Button>
        </Link> 
      </>
      )
    }
  </Container>
  )
}

export default ArticleGrid