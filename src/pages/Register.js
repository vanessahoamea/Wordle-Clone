import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Auth.css";

export default function Register(props)
{
    const [registerData, setRegisterData] = useState({
        "email": "",
        "password": ""
    });

    function handleChange(event)
    {
        setRegisterData((prevRegisterData) => {
            return {
                ...prevRegisterData,
                [event.target.id]: event.target.value
            }
        });
    }

    function registerUser()
    {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData)
        };

        fetch("http://localhost:5000/auth/register", options)
        .then(resp => {
            if(resp.ok)
                return resp.json();
            return resp.json().then(response => { throw new Error(response.message) });
        })
        .then(_ => alert("Account created. You can log in now."))
        .catch(err => alert(err));
    }

    return (
        <div className="auth">
            <h1>Create a new user account.</h1>
            
            <form className="auth-form">
                <label>E-mail</label>
                <input type="email" id="email" value={registerData.email} onChange={handleChange}></input>

                <label>Password</label>
                <input type="password" id="password" value={registerData.password} onChange={handleChange}></input>
            </form>

            <button className="auth-button" onClick={registerUser}>Register</button>

            <p className="bottom-text">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    );
}