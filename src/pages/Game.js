import { useEffect, useState } from "react";
import Wordle from "../components/Wordle";
import "../assets/css/Game.css";

export default function Game(props)
{
    const [solution, setSolution] = useState();
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/word")
        .then(resp => resp.json())
        .then(resp => {
            setSolution(resp.word);
            console.log(resp.word); //for testing
        })
        .catch(_ => setSolution("debug"));
    }, []);

    return (
        <>
            <header className="navbar">
                {
                    props.jwt
                    ? <i className="fa-solid fa-right-from-bracket" title="Log out" onClick={props.logout}></i>
                    : <i className="fa-solid fa-right-to-bracket" title="Log in" onClick={() => props.redirect("login")}></i>
                }
                <h1>Wordle</h1>
                <i className="fa-solid fa-chart-simple" title="Stats" onClick={() => setShowStats(true)}></i>
            </header>

            {
                solution &&
                <Wordle solution={solution} setShowStats={setShowStats} />
            }
        </>
    );
}