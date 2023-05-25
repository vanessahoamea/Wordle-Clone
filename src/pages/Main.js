import { useNavigate } from "react-router-dom";
import "../assets/css/Main.css";

export default function Main(props)
{
    const navigate = useNavigate();

    function logoutAndRedirect()
    {
        props.logout();
        navigate("/login");
    }

    return (
        <div className="start-page">
            <div className="start-page-content">
                <span className="logo"></span>
                <h1>Wordle</h1>

                <p>Get 6 chances to guess a 5-letter word.</p>

                <div className="start-page-buttons">
                    {
                        props.jwt
                        ? <button onClick={logoutAndRedirect}>Log out</button>
                        : <button onClick={() => navigate("/login")}>Log in</button>
                    }
                    <button onClick={() => navigate("/play")}>Play</button>
                </div>
            </div>
        </div>
    );
}