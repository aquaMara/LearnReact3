import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.token}`;
                console.log("requestIntercept config.headers['Authorization']", config.headers['Authorization']);
                console.log("requestIntercept config", config);
            }
            if (config.headers['Authorization']) {
                console.log("2 requestIntercept config.headers['Authorization']", config.headers['Authorization']);
                console.log("2 requestIntercept config", config);
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            return Promise.reject(error);
        }
    );

    return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
    }      

    }, [auth]);

    return axiosPrivate;
}

export default useAxiosPrivate;