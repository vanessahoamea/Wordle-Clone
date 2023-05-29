import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
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
                    ? <FontAwesomeIcon icon={faRightFromBracket} title="Log out" onClick={props.logout} size="xl" />
                    : <FontAwesomeIcon icon={faRightToBracket} title="Log in" onClick={() => props.redirect("login")} size="xl" />
                }
                <h1>Wordle</h1>
                <FontAwesomeIcon icon={faChartSimple} title="Stats" onClick={() => setShowStats(true)} size="xl" />
            </header>

            {
                solution &&
                <Wordle 
                    jwt={props.jwt} 
                    solution={solution} 
                    showStats={showStats}
                    setShowStats={setShowStats}
                />
            }
        </>
    );
}