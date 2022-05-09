import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
// import axios from "axios";

import axios from "../api/axios";
// import { axiosPrivate } from "../api/axios";

export default function Test() {

    const { id } = useParams();

    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState("");
    const { auth } = useAuth();
    console.log("auth in users", auth.token);

    const getUsers = async () => {
        try {
            
            const url = "http://localhost:8080/learn/users";
            console.log("url", url);
            const tk = `Bearer ${auth.token}`;
            console.log("tk",tk);

            const response = await axiosPrivate.get(`/users/${id}`);
            /*
            const response = await axios.get("/users", {
                withCredentials: true,
                credentials: 'include',
                headers: 
                { 
                    'Content-Type':'application/json', 
                    'Authorization': tk
                } 
            });
            */
            console.log(response.data);

            
        }  catch (err) {
            if (!err?.response) {
                //setErrorMessage("No error response");
                console.log("No error response");
            } else if(err.response?.status === 403) {
                //setErrorMessage("Invalid username or password");
                console.log("Invalid username or password");
            } else if(err.response?.status === 500) {
                console.log("Unauthorized");
            } else {
                console.log("Login failed")
            }
        }                
        // getUsers();
    }
    
    useEffect(() => {

        //let isMounted = true;
        // const controller = AbortController();
        getUsers();
    }, [])

    return (
        <div>Test
            gghh
            
        </div>
        
    )
}