import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";

export default function Registration() {

    const {register, formState: {errors, isValid}, handleSubmit, reset, watch} = useForm({mode: "onBlur"});
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

    const handleSubmitCustom = async (data) => {
        console.log(data.password);
        console.log(data.passwordConfirmation);
        if (data.password !== data.passwordConfirmation) {
            setPasswordErrorMessage("Password and password confirmation should be equal");
        }
        console.log(data);
        
        try {
            const response = await axios.post("/register", data)
            console.log("data", response.data);
            if(response.status === 201) {
                console.log("You are successfully registered!");
                setSuccessfullyRegistered(true);
            }
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
                setErrorMessage("No server response");
            } else if (err.response?.status === 400) {
                console.log("Username is taken");
                setErrorMessage("Username is taken");
            }
        }
        
        // reset();
    }

    return (
        <div className="topPart">
            {successfullyRegistered
            ? (
                <section>
                    <h1>You are successfully registered!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            )
            : (
                <div>
                    <h1>REGISTRATION COMPONENT</h1>
                    <form onSubmit={handleSubmit(handleSubmitCustom)}>
                        <label>
                            How should people address you?
                            <input 
                                {
                                    ...register("name", 
                                    {
                                        required: "Can not be empty",
                                        minLength: {value: 3, message: "Minimum length is 4 symbols"}
                                    })
                                }
                            />
                            {errors?.name && <p>{errors?.name?.message}</p>}
                        </label>
                        <label>
                            Username:
                            <input 
                                {
                                    ...register("username", 
                                    {
                                        required: "Can not be empty",
                                        minLength: {value: 4, message: "Minimum length is 4 symbols"}
                                    })
                                }
                            />
                            {errors?.username && <p>{errors?.username?.message}</p>}
                        </label>
                        <label>
                            Password:
                            <input 
                                {
                                    ...register("password", 
                                    {
                                        required: "Can not be empty",
                                        minLength: {value: 6, message: "Minimum length is 4 symbols"},
                                        maxLength: {value: 16, message: "Maximum length is 16 symbols"}
                                    })
                                }
                                type="password"
                            />
                            {errors?.password && <p>{errors?.password?.message}</p>}
                        </label>
                        <label>
                            Check password:
                            <input 
                                {
                                    ...register("passwordConfirmation", 
                                    {
                                        required: "Can not be empty"
                                    })
                                }
                                type="password"
                            />
                            {errors?.passwordConfirmation && <p>{errors?.passwordConfirmation?.message}</p>}
                            {passwordErrorMessage && <p>{passwordErrorMessage}</p>}              
                        </label>
                        <label>
                            Email:
                            <input 
                                {
                                    ...register("email", 
                                    {
                                        required: "Can not be empty",
                                        pattern: {value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Email should be valid"}
                                    })
                                }
                                type="email"
                            />
                            {errors?.email && <p>{errors?.email?.message}</p>}
                        </label>
                        <p>I would like to:</p>
                            <label htmlFor="field-student">
                                <input
                                    {
                                        ...register("userRole", 
                                        {
                                            required: "Can not be empty 1st"
                                        })
                                    }
                                    type="radio"
                                    name="userRole"
                                    value="ROLE_STUDENT"
                                    id="field-student"
                                />
                                I want to be a student
                            </label>
                            <label htmlFor="field-teacher">
                                <input
                                    {
                                        ...register("userRole", 
                                        {
                                        required: "Can not be empty 2nd"
                                        })
                                    }
                                    type="radio"
                                    name="userRole"
                                    value="ROLE_TEACHER"
                                    id="field-teacher"
                                />
                                I want to be a teacher
                                {errors?.userRole && <p>{errors?.userRole?.message}</p>}
                            </label>
                            {errorMessage && <p>{errorMessage}</p>}
                        <button disabled={!isValid}>Sign Up</button>
                    </form>
                </div>
            )


            }
        </div>
    );
}

        