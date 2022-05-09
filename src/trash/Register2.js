// name username password email userRole
import React from "react";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
// const EMAIL_REGEX = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/;

const Register = () => {

    const [person, setPerson] = React.useState(
        {
            name: "",
            username: "",
            password: "",
            passwordConfirmation:"",
            email: "",
            userRole: ""
        }
    )
    const [errorName, setErrorName] = useState();
    const [errorUsername, setErrorUsername] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorPasswordConfirmation, setErrorPasswordConfirmation] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [erroruserRole, setErrorUserRole] = useState();

    const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

    const handleChange = (event) => {

        const { name, value, type, checked } = event.target;
        switch (name) {
            case "name":
                setErrorName();
                break;
            case "username":
                setErrorUsername();
                break;
            case "password":
                setErrorPassword();
                break;
            case "passwordConfirmation":
                setErrorPasswordConfirmation();
                break;
            case "email":
                setErrorEmail();
                break;
            case "userRole":
                setErrorUserRole();
                break;
        }
        setPerson(prevPerson => {
            return {
                ...prevPerson,
                [name]: type === "checkbox" ? checked : value
            }
        })
    
    }    

    const validate = () => {
        if (person.name.length <= 10 || person.name.length >= 30) {
            setErrorName("Name must be more than 10 symbols and less than 30 symbols");
        }
        if (person.username.length <= 6 || person.username.length >= 15) {
            setErrorName("Name must be more than 6 symbols and less than 15 symbols");
        }
        if (person.email.length <= 6 || person.username.length >= 15) {
            setErrorEmail("Name must be more than 6 symbols and less than 15 symbols");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        validate();
    }



    return (
        <div className="topPart">
            {successfullyRegistered
            ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            )
            : (
                <section>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name-input">Enter how to address you</label>
                        <input 
                            type="text"
                            id="name-input"
                            placeholder="name"
                            onChange={handleChange}
                            name="name"
                            value={person.name}
                        />
                        {errorName != null && <p>{errorName}</p>}
                        <label htmlFor="username-input">Choose username</label>
                        <input 
                            type="text"
                            id="username-input"
                            placeholder="username"
                            onChange={handleChange}
                            name="username"
                            value={person.username}
                        />
                        {errorName != null && <p>{errorName}</p>}
                        <label htmlFor="password-input">Choose password</label>
                        <input 
                            type="text"
                            id="password-input"
                            placeholder="password"
                            onChange={handleChange}
                            name="password"
                            value={person.password}
                        />
                        <label htmlFor="passwordConfirmation-input">Confirm password</label>
                        <input 
                            type="text"
                            id="passwordConfirmation-input"
                            placeholder="password confirmation"
                            onChange={handleChange}
                            name="passwordConfirmation"
                            value={person.passwordConfirmation}
                        />
                        <label htmlFor="email-input">Enter email</label>
                        <input 
                            type="email"
                            id="email-input"
                            placeholder="email"
                            onChange={handleChange}
                            name="email"
                            value={person.email}
                        />
                        <fieldset>
                            <legend>Choose your role</legend>
                            <label htmlFor="student-input">Student</label>
                            <input 
                                type="radio"
                                id="student-input"
                                onChange={handleChange}
                                name="userRole"
                                value="ROLE_STUDENT"
                                checked={person.userRole === "ROLE_STUDENT"}
                            />
                            <label htmlFor="teacher-input">Teacher</label>
                            <input 
                                type="radio"
                                id="teacher-input"
                                onChange={handleChange}
                                name="userRole"
                                value="ROLE_TEACHER"
                                checked={person.userRole === "ROLE_TEACHER"}
                            />
                        </fieldset>
                        <button>Sign Up</button>
                    </form>
                </section>
            )


            }


        </div>
    );
}

export default Register;

/*
const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [radioErrorMessage, setRadioErrorMessage] = React.useState("");
    const [success, setSuccess] = useState(false);
    try {
        const response = await axiosRequest.post("/register", data)
        console.log("data", response.data);
        console.log("stringify", JSON.stringify(response));
        if(response.status === 201) {
            console.log("You are successfully registered!");
            setSuccessMessage("You are successfully registered!");
        }
    } catch (err) {
        if (!err?.response) {
            console.log("No server response");
        } else if (err.response?.status === 400) {
            console.log("Username is taken");
            setErrorMessage("Username is taken");
        }
    }

    const handleSubmitCustom = async (data) => {
        // event.preventDefault();
        console.log("p", data.password);
        console.log("pd", data.passwordConfirmation);
        if (data.password != data.passwordConfirmation) {
            console.log("password and passwordConfirmation are not equal");
            setPasswordErrorMessage("Password and password confirmation must be equal");
            return;
        }
        if (data.userRole === null) {
            setRadioErrorMessage("Role is required");
            return;
        }
        console.log("data ", data);
        try {
            const response = await axios.post("/register", data);
        } catch (err) {

        }
        
        alert("You are successfully registered!");
        setSuccess(true);
        reset();
    }

*/
