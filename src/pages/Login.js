import { useState } from "react";
import "../assets/css/Auth.css";

export default function Login(props)
{
    const [loginData, setLoginData] = useState({
        "email": "",
        "password": ""
    });

    function handleChange(event)
    {
        setLoginData((prevLoginData) => {
            return {
                ...prevLoginData,
                [event.target.id]: event.target.value
            }
        });
    }

    return (
        <div className="login">
            <h1>Log in to continue.</h1>
            
            <form className="login-form">
                <label>E-mail</label>
                <input type="email" id="email" value={loginData.email} onChange={handleChange}></input>

                <label>Password</label>
                <input type="password" id="password" value={loginData.password} onChange={handleChange}></input>
            </form>

            <button className="login-button" onClick={() => props.loginUser(loginData)}>Log in</button>
        </div>
    );
}