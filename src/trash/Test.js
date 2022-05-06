import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import Feed from "./Feed";
// import axios from "axios";

import axios from "../api/axios";
// import { axiosPrivate } from "../api/axios";

export default function Test() {

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

            const response = await axiosPrivate.get("/users");
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
            setUsers(response.data);

            
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
 // <Feed users={users} />
    const arr = users.map(item => <p key={item.userId}>Name: {item.username}</p>) 
    return (
        <div>Test
           {arr}
            
        </div>
        
    )
}

/*
                fetch(url, {
                    method: "GET",
                    withCredentials: true,
                    credentials: 'include',
                    //mode: 'cors',
                    headers: 
                    {
                        'Content-Type':'application/json', 
                        'Authorization': tk, 
                        'Access-Control-Allow-Origin': '*'
                    },
                    // mode: "no-cors", // same-origin, no-cors
                }).then(res => {res.json(); console.log(res.data); console.log("DFGHJYGUGGHGHGHGH")})
                .catch((error) => console.log("error", error));
                */




// const response = axios({ method: 'get', url: "http://localhost:8080/learn/users", headers: { 'Authorization': 'Bearer ' + auth.token } })
                /*
                return axios({ method: 'get', url: api + '/api/user/getUserInfo?UserId=1', headers: { 'Authorization': 'Bearer ' + accessToken } })
                // ***
                
                */
                /*
                const response = await axios.get("/users", {
                    headers: { Authorization: `Bearer ${auth.token}` } 
                });
                */
                /*
                var url = "http://localhost:8080/learn/users";
                console.log("url", url);
                var tk = `Bearer ${auth.token}`;
                console.log("tk",tk);
             const response = await axiosPrivate.get("/users");
             setUsers(response);
             */
                 /*
                 fetch(url, {
                     method: "GET",
                     withCredentials: true,
                     credentials: 'include',
                     // mode: 'cors',
                     headers: 
                     {
                         'Content-Type':'application/json', 
                         'Authorization': tk, 
                         'Access-Control-Allow-Origin': '*'
                     },
                     // mode: "no-cors", // same-origin, no-cors
                 }).then(res => {res.json(); console.log(res)})
                 .catch((error) => console.log("error", error));
                 */
                 
                 
                 /*
                 console.log("response in users", response);
                 console.log("response.data in users", response.data);
                 setUsers(response.data);
                 */