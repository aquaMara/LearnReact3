import React from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Registration from "./Registration";
import { Link } from "react-router-dom";

const Login = () => {

    const { auth, setAuth } = useAuth();

    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const {register, formState: {errors, isValid}, handleSubmit, reset, watch} = useForm({mode: "onBlur"});
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();


    const handleSubmitCustom = async (data) => {
        try {
            const response = await axios.post("/login", 
                data, 
                {
                    headers: { "Content-Type": "application/json"}
                }
            );
            console.log("response?.data in login:", response?.data);
            console.log("response in login:", response);
            const token = response?.data?.token;
            console.log("accessToken(token) in login:", token);
            const username = response?.data?.username;
            console.log("username in login:", username);
            const role = response?.data?.role;
            console.log("role in login:", role);
            setAuth({ username, role, token});
            if (role === "ROLE_TEACHER" || role === "ROLE_STUDENT") {
                navigate("/home");
            }
            if (role === "ROLE_ADMIN") {
                navigate("/admin/subjects");
            }

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


    return (
        <section>
            <h1>LOGIN COMPONENT</h1>
            <form onSubmit={handleSubmit(handleSubmitCustom)}>
                <label htmlFor="username-input">Username:</label>
                <input 
                    {
                        ...register("username", 
                        {
                            required: "Can not be empty"
                        })
                    }
                    type="text"
                    id="username-input"
                />
                {errors?.username && <p>{errors?.username?.message}</p>}
                <label htmlFor="password-input">Password:</label>
                <input 
                    {
                        ...register("password", 
                        {
                            required: "Can not be empty"
                        })
                    }
                    type="password"
                    id="password-input"
                />
                {errors?.password && <p>{errors?.password?.message}</p>}
                <button disabled={!isValid}>Sign In</button>
            </form>
            <Link to="/register" element={<Registration />}>or Sign Up</Link>
            </section>
    );    
}

export default Login;