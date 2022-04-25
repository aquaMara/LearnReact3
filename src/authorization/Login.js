import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
/*
// import { useContext } from "react";
import { useForm } from "react-hook-form";
import axiosRequest from "../api/axiosRequest";
// import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { type } from "@testing-library/user-event/dist/type";
// TRUEEEEEEEEEEEEEEEEEEEEE
*/

const Login = () => {

    const { auth, setAuth } = useAuth();

    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const {register, formState: {errors, isValid}, handleSubmit, reset, watch} = useForm({mode: "onBlur"});
    const [errorMessage, setErrorMessage] = React.useState("");
    // const [success, setSuccess] = React.useState(false);
    const navigate = useNavigate();


    const handleSubmitCustom = async (data) => {
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
            console.log("auth.username in login", auth.username);
            console.log("____________");
            navigate("/t");
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
            <a href="#">or Sign Up</a>
        </section>
    );    
}

export default Login;


    /*
    function handleSubmitCustom2(data) {
        // event.preventDefault();
        console.log("data ", data);
        fetch("http://localhost:8080/learn/login"), {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data)
            }).then(console.log(data)).then(res => {res.json(); console.log(res)})
            .catch((error) => console.log("error", error));
        reset();
        
        }
        */