import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Wordle from "../components/Wordle";
import "../assets/css/Game.css";

export default function Game(props)
{
    const [solution, setSolution] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/word")
        .then(resp => resp.json())
        .then(resp => {
            setSolution(resp.word);
        })
        .catch(_ => setSolution("debug"));
    }, []);

    function showStats(show)
    {
        const display = show ? "block" : "none";
        document.getElementById("modal").style.display = display;
    }

    return (
        <>
            <header className="navbar">
                {
                    props.jwt
                    ? <FontAwesomeIcon data-test="logout-button" icon={faRightFromBracket} title="Log out" onClick={props.logout} size="xl" />
                    : <FontAwesomeIcon data-test="login-button" icon={faRightToBracket} title="Log in" onClick={() => props.redirect("login")} size="xl" />
                }
                <h1>Wordle</h1>
                <FontAwesomeIcon data-test="stats-button" icon={faChartSimple} title="Stats" onClick={() => showStats(true)} size="xl" />
            </header>

            {
                solution &&
                <p style={{textAlign: "center", marginTop: "10px"}}>
                    Your word is: <span data-test="solution">{solution}</span>
                </p>
            }

            {
                solution &&
                <Wordle 
                    jwt={props.jwt} 
                    solution={solution} 
                    showStats={showStats}
                />
            }
        </>
    );
}