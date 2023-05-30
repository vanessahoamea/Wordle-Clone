import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keys from "./Keys";
import Stats from "./Stats";

export default function Wordle(props)
{
    const wordle = useWordle(props.solution, props.showStats);

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
            <Keys 
                usedKeys={wordle.usedKeys}
                gameOver={wordle.gameOver}
                handleKeyup={wordle.handleKeyup}
            />
            <Stats 
                jwt={props.jwt}
                solution={props.solution}
                turn={wordle.turn}
                gameOver={wordle.gameOver}
                showStats={props.showStats}
            />
        </>
    );
}