import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

const Login2 = () => {

    const { auth, setAuth } = useAuth();

    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const {register, formState: {errors, isValid}, handleSubmit, reset, watch} = useForm({mode: "onChange"});
    const [errorMessage, setErrorMessage] = React.useState("");
    // const [success, setSuccess] = React.useState(false);
    const navigate = useNavigate();

  const handleSubmitCustom = async (data) => {
      console.log("data", data)
        try {
            const response = await axios.post("/login", 
                data, 
                {
                    headers: { "Content-Type": "application/json"}
                }
            );
            // setSuccess(true);
            console.log("response?.data in login:", response?.data);
            console.log("response in login:", response);
            // console.log("JSON.stringify(response) in login:", JSON.stringify(response));
            const token = response?.data?.token;
            console.log("accessToken(token) in login:", token);
            const username = response?.data?.username;
            console.log("username in login:", username);
            const role = response?.data?.role;
            console.log("role in login:", role);
            // setAuth({ username, password, role, token});
            setAuth({ username, role, token});
            if (role === "ROLE_TEACHER" || role === "ROLE_STUDENT") {
                navigate("/home");
            }
            if (role === "ROLE_ADMIN") {
                navigate("/admin/subjects");
            }
            
            // console.log("from in login:", from)
            // navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrorMessage("No error response");
                console.log("No error response");
            } else if(err.response?.status === 403) {
                setErrorMessage("Invalid username or password");
                console.log("Invalid username or password");
            } else if(err.response?.status === 500) {
                setErrorMessage("Unauthorized");
            } else {
                setErrorMessage("Login failed")
            }

        }
        
    }

// {errors?.username && <p>{errors?.username?.message}</p>}
    return (
        <Container disableGutters maxWidth={"100%"} className="container--subjects">
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography className="top-navigation--text" variant="h6" component="div" sx={{ flexGrow: 1, padding: 0, color: "#7015a5", marginBottom: "10px" }}>
              Login Page
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitCustom)} style={{display: "grid", gridGap: "10px"}}>
                <TextField required id="outlined-required" label="username"
                    {...register("username", { required: "Can not be empty" })}
                    error={!!errors?.username}
                    helperText={errors?.username ? errors.username.message : null}
                />
                <TextField required id="outlined-required" label="password"
                    {...register("password", { required: "Can not be empty" })}
                    error={!!errors?.password}
                    helperText={errors?.password ? errors.password.message : null}
                    type="password"
                />
                <button disabled={!isValid} style={{backgroundColor: "#9dd0ea", border: "none", padding: "6px"}}>Sign In</button>
            </form>
            {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            <Link to="/register" className="link">or Sign Up</Link>
        </Grid>
        </Container>
    );    
}

export default Login2