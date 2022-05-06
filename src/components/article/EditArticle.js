import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import MissingData from "../MissingData";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const EditArticle = () => {

    const { articleId } = useParams();

    const [prevArticle, setPrevArticle] = useState({});
    const [editHeading, setEditHeading] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editLink, setEditLink] = useState("");
    const [editLiterature, setEditLiterature] = useState("");

    const [sectionId, setSectionId] = useState("");
    const [sections, setSections] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [subjectId, setSubjectId] = useState("");
    const [subjects, setSubjects] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const getArticle = async () => {
        try {
            const response = await axiosPrivate.get(`/articles/${articleId}`);
            console.log("response in EditArticle (getArticle)", response);
            console.log("prev article 1 >> in Edit Article", response.data);
            
            if (response.data !== null) {
                console.log("HFGFGGFGFG");
                setEditHeading(response.data.heading);
                setEditContent(response.data.content);
                setEditLink(response.data.link);
                setEditLiterature(response.data.literature);
            }
            console.log("prev article 2 >> in Edit Article", prevArticle);

        } catch(err) {
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
        //getUser();
        // getSections();
        // getSubjects();
        getArticle();
        
    }, [])

    const handleSubmit = async (e) => {
        if (editHeading.trim() === "" || editContent.trim() === "") {
            console.log("Something is empty");
            setErrorMessage("Fields with a star are required and must be filled");
        } else {
            e.preventDefault();
            setErrorMessage("");
            console.log("editContent", editContent);
            const updatedArticle = {heading: editHeading, content: editContent, link: editLink, literature: editLiterature};
            console.log("updatedArticle in EditArticle", updatedArticle);
            console.log("articleId", articleId)
            try {
            const response = axiosPrivate.put(`/articles/${articleId}`, updatedArticle);
            console.log("response in handleSubmit in EditArticle", response)
            // navigate("/home/");
            // navigate("/home/account/" + auth.username);
            } catch (err) {
            console.log(`Error in post: ${err.message}`);
            }
        }
        
    }


  return (
    <main className="new-article">
        <h2>Update Article</h2>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className="form--info">
            <TextField
                required
                id="outlined-required"
                label="Heading"
                style={{ width: "20%" }}
                value={editHeading}
                onChange={(e) => setEditHeading(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Link"
                style={{ width: "20%" }}
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Literature"
                style={{ width: "20%" }}
                value={editLiterature}
                onChange={(e) => setEditLiterature(e.target.value)}
            />
            </div>
            <div className="form--content">
            <TextField
                required
                id="outlined-multiline-flexible"
                label="Content"
                multiline
                rows={10}
                style={{ width: "80%" }}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
            />
            </div>
            <div>
                { errorMessage && <Typography style={{ color: "red", paddingBottom: "100px" }} gutterBottom variant="h7">{errorMessage}</Typography> }
            </div>
            <Button style={{ marginTop: "10px" }} variant="outlined" onClick={(e) => {handleSubmit(e)}}>Update</Button>
        </Box>
      
    </main>
  )
}

export default EditArticle