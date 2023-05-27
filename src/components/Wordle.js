import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";

export default function Wordle(props)
{
    const wordle = useWordle(props.solution, props.setShowStats);

    useEffect(() => {
        if(wordle.gameOver == 0)
            window.addEventListener("keyup", wordle.handleKeyup);

        return () => window.removeEventListener("keyup", wordle.handleKeyup);
    }, [wordle.gameOver, wordle.handleKeyup]);

    return (
        <>
            <Grid 
                turn={wordle.turn}
                currentGuess={wordle.currentGuess}
                allGuesses={wordle.allGuesses}
            />
        </>
    );
}