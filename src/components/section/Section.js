import React from "react";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Section = () => {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [sections, setSections] = useState([]);

    const getSections = async () => {

        try {
            const response = await axiosPrivate.get("/sections");
            console.log(response);
            if (response.data.length > 0) {
                setSections(response.data);
            }

        } catch(err) {
            console.log(err.response);
            console.log(err.response.status);
        }

    }

    useEffect(() => {
        getSections();
    }, [])



  return (
    <div>Section</div>
  )
}

export default Section