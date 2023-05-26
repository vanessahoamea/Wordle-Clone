import { useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="auth">
            <h1>Log in to your account.</h1>
            
            <form className="auth-form">
                <label>E-mail</label>
                <input type="email" id="email" value={loginData.email} onChange={handleChange}></input>

                <label>Password</label>
                <input type="password" id="password" value={loginData.password} onChange={handleChange}></input>
            </form>

            <button className="auth-button" onClick={() => props.loginUser(loginData)}>Log in</button>

            <p className="bottom-text">Don't have an account yet? <Link to="/register">Register now</Link></p>
        </div>
    );
}