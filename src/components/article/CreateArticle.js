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

const CreateArticle = () => {

    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");
    const [literature, setLiterature] = useState("");

    const [sectionId, setSectionId] = useState("");
    const [sections, setSections] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [subjectId, setSubjectId] = useState("");
    const [subjects, setSubjects] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await axiosPrivate.get("/users/username/" + auth.username);
            console.log("response in account (user)", response);
            console.log("current user 1 >> in Create Article", response.data);
            if (response.data !== null) {
                setCurrentUser(response.data);
            }
            console.log("current user 2 >> in Create Article", currentUser);

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

    const getSubjects = async () => {
        try {
            const response = await axiosPrivate.get("/subjects/");
            console.log("response in in Create Article (subjects)", response);
            console.log("current subjects 1 >> in Create Article", response.data);
            setSubjects(response.data);
            console.log("current subjects 2 >> in Create Article", subjects);
            

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

    const getSections = async () => {
        try {
            const response = await axiosPrivate.get("/sections/");
            console.log("response in in Create Article (sections)", response);
            console.log("current sections 1 >> in Create Article", response.data);
            setSections(response.data);
            console.log("current sections 2 >> in Create Article", sections);
            

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
        getUser();
        // getSections();
        getSubjects();
    }, [])

    const handleSubjectChange = async (id) => {
        console.log("ID", id);
        setSubjectId(id);
        setSectionId("");
        // setSubjectId(e.target.value);
        try {
            const response = await axiosPrivate.get(`/subjects/${id}`);
            console.log("handleSubjectChange DFFGFG", response);
            console.log("response.data.sections.length", response.data.sections.length);
            setSections(response.data.sections);
            if (response.data.sections.length > 0) {
                setSections(response.data.sections);
            }
            /*

                    .then(resp => {console.log("resp", resp)})
                    .then(resp => {console.log("resp.data.sections", resp.data.sections)})
                    .then(resp => {setSections(resp.data.sections)})
                    .then(console.log("SECTIONS", sections));
            */
            
        } catch(err) {
            console.log("handleSubjectChange error", err);
            if (!err?.response) {
                console.log("No error response");
            } else if(err.response?.status === 403) {
                console.log("Invalid username or password");
            } else if(err.response?.status === 500) {
                console.log("Unauthorized");
            } else {
                console.log("Login failed")
                console.log(err);
            }
        }
        
        
    }

    const handleSubmit = async (e) => {
        if (heading.trim() === "" || content.trim() === "") {
            console.log("Something is empty");
            setErrorMessage("Fields with a star are required and must be filled");
        } else {
            e.preventDefault();
            setErrorMessage("");
            console.log("auth.username in CreateArticle", auth.username);
            console.log("currentUser.userId in CreateArticle", currentUser.userId)
            const newArticle = {heading, content, link, literature, sectionId, userId: currentUser.userId};
            const response = await axiosPrivate.post("/articles/", newArticle);
            console.log("newArticle in CreateArticle", newArticle);
            try {
            // const response = axiosPrivate.post("/articles", newArticle);
            setHeading("");
            setContent("");
            setLink("");
            setLiterature("");
            setSectionId("");
            setSubjectId("");
            // navigate("/home/");
            // navigate("/home/account/" + auth.username);
            } catch (err) {
            console.log(`Error in post: ${err.message}`);
            }
        }
        
    }


  return (
    <main className="new-article">
        <h2>NewArticle</h2>
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
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Link"
                style={{ width: "20%" }}
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Literature"
                style={{ width: "20%" }}
                value={literature}
                onChange={(e) => setLiterature(e.target.value)}
            />
            </div>
            <div className="form--selectors">
            {subjects &&
            <TextField
                id="outlined-select"
                select
                label="Select subject"
                style={{ width: "20%" }}
                value={subjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                helperText="Please select section for the article"
            >
                {subjects.map((option) => (
                    <MenuItem key={option.subjectId} value={option.subjectId}>
                    {option.subjectName}
                    </MenuItem>
                ))}
            </TextField>
            }
            {sections &&
            <TextField
                id="outlined-select"
                select
                label="Select section"
                style={{ width: "20%" }}
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                helperText="Please select section for the article"
            >
                {sections.map((option) => (
                    <MenuItem key={option.sectionId} value={option.sectionId}>
                    {option.sectionName}
                    </MenuItem>
                ))}
            </TextField>
            }
            </div>
            <div className="form--content">
            <TextField
                required
                id="outlined-multiline-flexible"
                label="Content"
                multiline
                rows={10}
                style={{ width: "80%" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            </div>
            <div>
                { errorMessage && <Typography style={{ color: "red", paddingBottom: "100px" }} gutterBottom variant="h7">{errorMessage}</Typography> }
            </div>
            <Button style={{ marginTop: "10px" }} variant="outlined" onClick={(e) => {handleSubmit(e)}}>Create</Button>
        </Box>
      
    </main>
  )
}

export default CreateArticle

/*
<form className="new-article--form" onSubmit={handleSubmit}>
        <label htmlFor="heading">Heading:</label>
        <input
          id="heading"
          type="text"
          required
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label htmlFor="link">Link:</label>
        <input
          id="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="literature">Literature:</label>
        <input
          id="literature"
          type="text"
          value={literature}
          onChange={(e) => setLiterature(e.target.value)}
        />
        {subjects.length === 0 ? (<MissingData />)
        : (
            <>
            <InputLabel id="subject">Country</InputLabel>
            <Select labelId="subject" id="subject" value={subject}>
            {subjects.map((item) => (
                <MenuItem key={item.subjectId} value={item.subjectId}>
                    {item.subjectName}
                </MenuItem>
            ))}
            </Select>
            </>
        )    
        }
        <button>Create</button>
      </form>

*/