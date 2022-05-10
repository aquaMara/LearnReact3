import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MissingData from "../MissingData";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FormLabel } from "@mui/material";

const Subjects = () => {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [subjects, setSubjects] = useState([]);
    const [newSubjectName, setNewSubjectName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

    const getSubjects = async () => {

        try {
            const response = await axiosPrivate.get("/subjects");
            console.log(response);
            if (response.data.length > 0) {
                setSubjects(response.data);
            }

        } catch(err) {
            console.log(err.response);
            console.log(err.response.status);
        }

    }

    useEffect(() => {
        getSubjects();
    }, [])

    const handleDelete = async (subjectId) => {
        try {
        
          console.log("subjectId in admin handleDelete >>", subjectId)
          const response = await axiosPrivate.delete(`/subjects/${subjectId}`);
          console.log("response in admin handleDelete", response);
          const arr = subjects.filter(item => item.subjectId !== subjectId);
          setSubjects(arr);
    
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


    const handleSubmitSubject = async (subjectName) => {
        console.log("subject:", subjectName);
        const subject = {subjectName};
        console.log("JHHHGGHGH", subject)
        try {
    
            const response = await axiosPrivate.post("/subjects", subject);
            console.log("response in subjects handleSubmitSubject", response);
            getSubjects();
            setNewSubjectName("");
            setErrorMessage("");
      
          }  catch (err) {
            if (err.response?.status === 400) {
                console.log("ghghghgh")
                setErrorMessage("Such subject already exists")
            }
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

    const handleUpload = async (subjectId, file) => {
        console.log(file.name);
        console.log(file);
        console.log(subjectId);
        // Content-Type:
        try {
    
            const updatedSubject = {data: file};
            const fd = new FormData();
            fd.append("data", file);
            const response = await axiosPrivate.post(`/subjects/upload/${subjectId}`, fd);
            console.log("response in subjects handleUpload", response);
            getSubjects();
      
          }  catch (err) {
              console.log(err);
              console.log(err.response);
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

    const Input = styled('input')({
        display: 'none',
      });

  return (
    <Container disableGutters maxWidth={"100%"} className="container--subjects">
        <Typography style={{padding: "1%", margin: "1%", color: "#7015a5", backgroundColor: "#9dd0ea"}}>
            Create subject
        </Typography>
        <div style={{display: "grid"}}>
            <TextField required id="outlined-required" label="Subject name" aria-labelledby="new-subject-input" style={{ width: "20%" }}
                    value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)}/>
            {errorMessage && <FormLabel id="new-subject-input" style={{textAlign: "start", color: "red"}}>Subject with such name already exists</FormLabel>}            
            <Button style={{ width: "100px" }} variant="outlined" onClick={(e) => {handleSubmitSubject(newSubjectName)}}>Create</Button>
        </div>
      {
        subjects.length === 0 ? ( <MissingData /> ) 
        : (
        <>
            <Typography style={{padding: "1%", margin: "1%", color: "#7015a5", backgroundColor: "#9dd0ea"}}>
                All subjects
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                {subjects.map((item) => (
                <Grid item key={item.subjectId} xs={4} sm={4} md={2}>
                    {item.filePath && <img src={require(`../../images/${item.filePath}`)} alt="pic" width={60} />}
                    {!item.filePath && (
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => handleUpload(item.subjectId, e.target.files[0])}/>
                            <Button variant="contained" component="span" >Upload An Image</Button>
                        </label>
                    )}
                    <Typography>{item.subjectName}</Typography>
                    <Typography>Number of sections: {item.sections.length}</Typography>
                    {item.sections.length !== 0 ? "" :  
                    <Button variant="outlined" onClick={() => handleDelete(item.subjectId)}>Delete</Button>
                    }
                    <Link to={`/admin/subjects/${item.subjectId}`} className="link">
                        <Button variant="outlined">Open Sections</Button>
                    </Link>
                </Grid>
                ))}            
            </Grid>
        </>
        )
        }
    </Container>
  )
}

export default Subjects