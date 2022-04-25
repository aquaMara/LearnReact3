import axios from "axios";

export default axios.create(
    {
        baseURL: "http://localhost:8080/learn"
    }
)

export const axiosPrivate = axios.create(
    {
        baseURL: "http://localhost:8080/learn",
        headers: {"Content-Type": "application/json"},
        // withCredentials: true
    }
)