import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import "./assets/css/App.css";

export default function App() {
    const [jwt, setJwt] = useState(() => {
        const savedValue = localStorage.getItem("jwt");
        return JSON.parse(savedValue) || "";
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("jwt", JSON.stringify(jwt));
    }, [jwt]);

    function loginUser(loginData)
    {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        };

        fetch("http://localhost:5000/auth/login", options)
        .then(resp => {
            if(resp.ok)
                return resp.json();
            return resp.json().then(response => { throw new Error(response.message) });
        })
        .then(resp => setJwt(resp.jwt))
        .catch(err => alert(err));
    }

    function logout()
    {
        setJwt("");
        localStorage.removeItem("jwt");
        location.reload();
    }

    function redirect(path)
    {
        navigate(path);
    }

    return (
        <>
            <Routes>
                <Route path="/" element={ <Main jwt={jwt} logout={logout} /> } />
                
                <Route path="/play" element={
                    <Game jwt={jwt} logout={logout} redirect={redirect} />
                } />

                <Route path="/login" element={
                    <PrivateRoute jwt={jwt}>
                        <Login loginUser={loginUser} />
                    </PrivateRoute>
                } />

                <Route path="/register" element={
                    <PrivateRoute jwt={jwt}>
                        <Register />
                    </PrivateRoute>
                } />
            </Routes>
        </>
    );
}