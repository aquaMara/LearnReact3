import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { Container, FormControl, Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

const Registration2 = () => {

    const {register, formState: {errors, isValid}, handleSubmit, reset, watch} = useForm({mode: "onChange"});
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
    const [userRole, setUserRole] = useState("ROLE_STUDENT");

    const handleSubmitCustom = async (data) => {
        console.log("radio", userRole)
        console.log("handleSubmitCustom", data)
        if (data.password !== data.passwordConfirmation) {
            setPasswordErrorMessage("Password and password confirmation should be equal");
        } else {

            const {name, username, password, email} = data;
            const person = {name, username, password, email, userRole};
            console.log("person", person)
        
            try {
                const response = await axios.post("/register", person)
                console.log("data", response.data);
                if(response.status === 201) {
                    console.log("You are successfully registered!");
                    setSuccessfullyRegistered(true);
                }
            } catch (err) {
                console.log(err);
                if (!err?.response) {
                    console.log("No server response");
                    setErrorMessage("No server response");
                } else if (err.response?.status === 400) {
                    console.log("Username is taken");
                    setUsernameErrorMessage("Username is taken");
                }
            }
        }
        
        
        // reset();
    }

    return (
        <Container disableGutters maxWidth={"100%"} className="container--subjects">
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography className="top-navigation--text" variant="h6" component="div" sx={{ flexGrow: 1, padding: 0, color: "#7015a5", marginBottom: "10px" }}>
              Registration Page
            </Typography>
            {successfullyRegistered
            ? (
                <section>
                    <h1>You are successfully registered!</h1>
                    <p>
                        <Link to="/login" className="link">Sign in</Link>
                    </p>
                </section>
            )
            : (
                <div>
                    <form onSubmit={handleSubmit(handleSubmitCustom)} style={{display: "grid", gridGap: "10px"}}>
                        <div style={{display: "grid"}}>
                            <FormLabel id="name-input" style={{textAlign: "start", marginBottom: "5px"}}>How should people address you?</FormLabel>
                            <TextField required id="outlined-required" label="Name" aria-labelledby="name-input" 
                                {...register("name", { required: "Can not be empty" })}
                                error={!!errors?.name}
                                helperText={errors?.name ? errors.name.message : null}
                            />
                        </div>
                        <div style={{display: "grid"}}>
                        <TextField required id="outlined-required" label="Username" aria-labelledby="username-input" 
                            {...register("username", { required: "Can not be empty", minLength: {value: 4, message: "Minimum length is 4 symbols"} })}
                            error={!!errors?.username}
                            helperText={errors?.username ? errors.username.message : null}
                        />
                        {usernameErrorMessage && <FormLabel id="username-input" style={{textAlign: "start", color: "red"}}>Username is taken</FormLabel>}
                        </div>
                        <TextField required id="outlined-required" label="Password" 
                            {...register("password", { 
                                required: "Can not be empty", 
                                minLength: {value: 6, message: "Minimum length is 6 symbols"},
                                maxLength: {value: 16, message: "Maximum length is 16 symbols"} 
                            })}
                            type="password"
                            error={!!errors?.password}
                            helperText={errors?.password ? errors.password.message : null}
                        />
                        <div style={{display: "grid"}}>
                            <TextField required id="outlined-required" label="Password confirmation" aria-labelledby="passwordConfirmation-input" 
                                {...register("passwordConfirmation", { 
                                    required: "Can not be empty" 
                                })}
                                type="password"
                                error={!!errors?.passwordConfirmation}
                                helperText={errors?.passwordConfirmation ? errors.passwordConfirmation.message : null}
                            />
                            {passwordErrorMessage && <FormLabel id="passwordConfirmation-input" style={{textAlign: "start", color: "red"}}>Passwords must be equal</FormLabel>}
                        </div>
                        <TextField required id="outlined-required" label="Email" 
                            {...register("email", { 
                                required: "Can not be empty", 
                                pattern: {value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Email should be valid"}
                            })}
                            type="email"
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null}
                        />
                        <div>
                            <FormLabel id="demo-controlled-radio-buttons-group">Role</FormLabel>
                            <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group"
                                row style={{justifyContent: "center"}}
                                value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                                <FormControlLabel value="ROLE_STUDENT"  control={<Radio />} label="Student" />
                                <FormControlLabel value="ROLE_TEACHER" control={<Radio />} label="Teacher" />
                            </RadioGroup>
                        </div>
                        <button disabled={!isValid} style={{backgroundColor: "#9dd0ea", border: "none", padding: "6px"}}>Sign Up</button>
                    </form>
                    <Link to="/login"  className="link">or Sign in</Link>
                </div>
            )
            }
        </Grid>
        </Container>
    );
}

export default Registration2;

/*
<p>I would like to:</p>
                            <label htmlFor="field-student">
                                <input
                                    {
                                        ...register("userRole", 
                                        {
                                            required: "Can not be empty 1st"
                                        })
                                    }
                                    type="radio"
                                    name="userRole"
                                    value="ROLE_STUDENT"
                                    id="field-student"
                                />
                                I want to be a student
                            </label>
                            <label htmlFor="field-teacher">
                                <input
                                    {
                                        ...register("userRole", 
                                        {
                                        required: "Can not be empty 2nd"
                                        })
                                    }
                                    type="radio"
                                    name="userRole"
                                    value="ROLE_TEACHER"
                                    id="field-teacher"
                                />
                                I want to be a teacher
                                </label>
*/