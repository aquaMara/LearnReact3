import React from "react";
import TopNavigation from "./TopNavigation";
import SubjectGrid from "./subject/SubjectGrid";

// {/* Subjects here */}
// <BottomNavigation />
        
const Home = () => {

  return (

    <div>
        <SubjectGrid />
    </div>
  )
}
/*
{
            arr.length === 0
            ? ( <MissingData /> )
            : (
               <Subject />
            )
        }
*/

export default Home


// const fileName = "math"
// <img src={require("../images/" + fileName + ".png")} />
// <img src={require(`../images/${fileName}.png`)} />
// <img src={im2} alt="ghgh" />
/*
const getSubjects = async () => {
        try {
    
            const response = await axiosPrivate.get("/subjects/");
            console.log("response", response);
            // console.log("subjects parse", JSON.parse(response.data));
            // console.log("subjects stringify", JSON.stringify(response.data));
            // console.log("subjects stringify", JSON.stringify(JSON.stringify(response.data)));
            // console.log("subjects parse", JSON.parse(JSON.stringify(response.data)));
            // console.log("subjects", response.data);

            console.log("subjects 2", response.data);
            setSubjects(response.data);
    
        }  catch (err) {
            if (!err?.response) {
                console.log("No error response");
            } else if(err.response?.status === 403) {
                console.log("Invalid username or password");
            } else if(err.response?.status === 500) {
                console.log("Unauthorized");
            } else {
                console.log("Login failed")
            }
        }
    }
    
    useEffect(() => {
        getSubjects();
    }, [])
*/
