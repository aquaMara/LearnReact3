import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Grid } from "@mui/material";
import { CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import MissingData from "../MissingData";
import "../../styles/person.css";
import "../../styles/BaseComponents.css";


function Author({ userId }) {

    // const { userId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [articleAuthor, setArticleAuthor] = useState();
    const [articlesOfAuthor, setArticlesOfAuthor] = useState([]);
    console.log(auth.token);

    useEffect(() => {

        const getPerson = async () => {

            try {
                const response = await axiosPrivate.get("/users/" + userId);
                console.log("response in Author", response);
                console.log("response.data in Author", response.data);
                setArticleAuthor(response.data);
                // setArticlesOfAuthor(response.data.articles);
            } catch(err) {

            }
        }

        getPerson();

    }, []);


  return (
    <>
        {articleAuthor &&
        <>
            <Typography gutterBottom variant="h7" className="article--info--element">Author's name: </Typography>
            <Typography gutterBottom variant="h8" className="article--info--element">{articleAuthor.name}</Typography><br/>
            <Typography gutterBottom variant="h7" className="article--info--element">Author's email: </Typography>
            <Typography gutterBottom variant="h8" className="article--info--element">{articleAuthor.email}</Typography><br/>
        </>
        }
    </>
  )
}

export default Author