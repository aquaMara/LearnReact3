import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
// import axios from "axios";

import axios from "../api/axios";
// import { axiosPrivate } from "../api/axios";

export default function Test() {

    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState("");
    const { auth } = useAuth();
    console.log("auth in users", auth.token);

    useEffect(() => {
        const getUsers = async () => {
            try {
                // const response = axios({ method: 'get', url: "http://localhost:8080/learn/users", headers: { 'Authorization': 'Bearer ' + auth.token } })
                /*
                return axios({ method: 'get', url: api + '/api/user/getUserInfo?UserId=1', headers: { 'Authorization': 'Bearer ' + accessToken } })
                // ***
                
                */
                const response = await axios.get("/users", {
                    headers: { Authorization: `Bearer ${auth.token}` } 
                });
                
                
                console.log("response in users", response);
                console.log("response.data in users", response.data);
                setUsers(response.data);

            } catch (err) {

                console.log("err in users", err);

            }
        }
        getUsers();
    }, [])

    return (
        <div>Test
            
        </div>
        
    )
}
