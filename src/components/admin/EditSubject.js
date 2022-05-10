import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NoData from "./NoData";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

const EditSubject = () => {

    const { subjectId } = useParams();

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [subject, setSubject] = useState({});
    const [sections, setSections] = useState([]);
    const [sectionName, setSectionName] = useState("");
    const [editSectionName, setEditSectionName] = useState("");
    const [newSectionName, setNewSectionName] = useState("");

    const getSubject = async () => {
        try {
            const response = await axiosPrivate.get(`/subjects/${subjectId}`);
            console.log(response);
            if (response) {
                setSubject(response.data);
            }
            if (response.data.sections.length > 0) {
                setSections(response.data.sections);
            }

        } catch(err) {
            console.log(err.response);
            console.log(err.response.status);
        }
    }

    useEffect(() => {
        getSubject();
    }, [])

    const handleDeleteSection = async (sectionId) => {
        try {
    
            console.log("sectionId in account handleDelete >>", sectionId)
            // const response = await axiosPrivate.get(`/users/?${username}` );
            const response = await axiosPrivate.delete(`/sections/${sectionId}`);
            console.log("response in editsubject handleDelete", response);
            const arr = sections.filter(item => item.sectionId !== sectionId);
            setSections(arr);
      
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

    const handleSubmitSection = async (sectionName) => {
        console.log("section:", sectionName);
        const section = {subjectId, sectionName};
        console.log("JHHHGGHGH", section)
        try {
    
            const response = await axiosPrivate.post("/sections", section);
            console.log("response in editsubject handleSubmitSection", response);
            getSubject();
            setNewSectionName("");
      
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

  return (
    <Container disableGutters maxWidth={"100%"} className="container--subjects">
        <Typography style={{padding: "1%", margin: "1%", color: "#7015a5", backgroundColor: "#9dd0ea"}}>
            Create section
        </Typography>
        <div>
            <TextField required id="outlined-required" label="Section name" style={{ width: "20%" }}
                    value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)}/>
            <Button style={{ marginTop: "10px" }} variant="outlined" onClick={(e) => {handleSubmitSection(newSectionName)}}>Create</Button>
        </div>
        {subject &&
        <>
        <Typography style={{padding: "1%", margin: "1%", color: "#7015a5", backgroundColor: "#9dd0ea"}}>
            All sections of subject: {subject.subjectName}
        </Typography>
        {
          sections.length === 0 ? ( <NoData /> ) 
          : (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                {sections.map((item) => (
                <Grid item key={item.sectionId} xs={4} sm={4} md={2}>
                    <Typography>{item.sectionName}</Typography>
                    <Typography>Number of articles: {item.articles.length}</Typography>
                        {item.articles.length !== 0 ? "" :  
                        <Button variant="outlined" onClick={() => handleDeleteSection(item.sectionId)}>
                        Delete
                        </Button>
                        } 
                </Grid>
                ))}            
            </Grid>
          )
        }
        </>
        }
        <div style={{padding: "1%", margin: "1%", marginTop:"5%", color: "#7015a5", backgroundColor: "#9dd0ea"}}>
            <Link to={"/admin/subjects"} className="link">Back to subjects</Link>
        </div>
    </Container>
  )
}

export default EditSubject