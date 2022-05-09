import React from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MissingData from "../MissingData";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

const Account = () => {

  const { username } = useParams();
  const { auth } = useAuth();
  const [currentUser, setCurrentUser] = useState();
  const [articles, setArticles] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  // await axiosRequest.delete(`/posts/${id}`);

  console.log("auth in account", auth.username);
  console.log("username in account", username);

  const getCurrentUserAccount = async () => {

    try {
    
      console.log("username in account >>", username)
      // const response = await axiosPrivate.get(`/users/?${username}` );
      const response = await axiosPrivate.get("/users/username/" + username);
      console.log("response in account", response);
      console.log("current user >>", response.data);
      setCurrentUser(response.data);
      console.log(response.data.articles);
      setArticles(response.data.articles);
      console.log("ARTICLES", articles);

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
    getCurrentUserAccount();
  }, [])

  // DELETE
  const handleDelete = async (articleId) => {
    try {
    
      console.log("articleId in account handleDelete >>", articleId)
      // const response = await axiosPrivate.get(`/users/?${username}` );
      const response = await axiosPrivate.delete("/articles/" + articleId);
      console.log("response in account handleDelete", response);
      const arr = articles.filter(item => item.articleId !== articleId);
      setArticles(arr);

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
    
      // await axiosRequest.delete(`/posts/${id}`);
    //await axiosRequest.delete(`/posts/${id}`);
    //const postsList = posts.filter(post => post.id !== id);
    //setPosts(postsList);
    // we are accessing the browser history and navigate to homepage when delete is completed
    //navigate("/");
    
  }

  return (
    <div>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#7015a5", maxWidth: "fit-content", padding: "2%" }}>
        Here all articles that you wrote are listed:
      </Typography>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#7015a5", maxWidth: "fit-content", padding: "2%" }}>
        <Link to={"/home/articles/create"} className="link">
          <Button variant="outlined" >Create an article</Button>
        </Link> 
      </Typography>
      {currentUser && 
        <div>
          {articles.length === 0 ? (<MissingData />)
          : (
              <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
              {articles.map((item) => (
                <Grid item key={item.articleId} xs={4} sm={4} md={3} className="box--articles">
                  <Link to={`/home/articles/${item.articleId}`} className="link">
                    <h4>{item.heading}</h4>
                    <p>******</p>
                    <p>{(item.content).length <=100 ? item.content : `${ (item.content).slice(0,100) }...`}</p>
                  </Link>
                  <Link to={`/home/articles/edit/${item.articleId}`} className="link">
                    <Button className="editButton">Edit</Button>
                  </Link> 
                  <Button className="deleteButton" onClick={() => handleDelete(item.articleId)}>Delete</Button>
                  </Grid>
              ))}            
              </Grid>
            )
          }
        </div>
      }
      <Link to={"/home/"} className="link">
          <Button>To all subjects</Button>
      </Link> 
    </div>
  )
}

export default Account;