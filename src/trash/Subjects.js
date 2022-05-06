import React from "react";
import { axiosPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import SubjectGrid from "../components/subject/SubjectGrid";


function Subjects() { 

  return (
    <div className="subject-grid">
        <SubjectGrid/>
    </div>
  )
}

export default Subjects