import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import BarChart from "./BarChart";
import "../assets/css/Stats.css";

export default function Stats(props)
{
    const [stats, setStats] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/stats", { 
            headers: { "Authorization": "Bearer " + props.jwt } 
        })
        .then(resp => {
            if(resp.ok)
                return resp.json();
            return resp.json().then(response => { throw new Error(response.message) });
        })
        .then(resp => setStats(resp))
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if(props.gameOver == 0 || props.jwt == "")
            return;

        fetch("http://localhost:5000/stats", { 
            method: "POST", 
            body: JSON.stringify({
                game_over: props.gameOver,
                turn: props.turn
            }), 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.jwt
            } 
        })
        .then(resp => {
            if(resp.ok)
                return resp.json();
            return resp.json().then(response => { throw new Error(response.message) });
        })
        .then(resp => setStats(resp))
        .catch(err => console.log(err));
    }, [props.gameOver]);

    return (
        <div id="modal">
            <div className="modal-content">
                <div data-test="close-button" className="close" onClick={() => props.showStats(false)}>
                    <FontAwesomeIcon icon={faX} />
                </div>

                {props.gameOver == 1 && <p>Congratulations!</p>}
                {props.gameOver == -1 && <p>Too bad!</p>}
                {props.gameOver != 0 && <p>The solution was <b>{props.solution}</b>.</p>}
                {props.gameOver != 0 && <hr />}
                {
                    !stats &&
                    <>
                        <p>No data to display.</p>
                        <p>If you want to see your statistics, you must first <Link to="/login">log in</Link>.</p>
                    </>
                }
                {
                    stats && 
                    <>
                        <p className="modal-text">Statistics</p>
                        <div className="modal-row">
                            <div className="modal-info">
                                <p data-test="games-played">{stats.games_played}</p>
                                <p>Played</p>
                            </div>
                            <div className="modal-info">
                                <p>{Math.round(stats.games_won / stats.games_played * 100) || 0}</p>
                                <p>Win %</p>
                            </div>
                        </div>

                        <p className="modal-text">Guess distribution</p>
                        <div style={{height: "150px", width: "300px"}}>
                            <BarChart stats={stats} />
                        </div>
                    </>
                }
            </div>
        </div>
    );
}