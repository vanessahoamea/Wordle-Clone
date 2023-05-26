import { useState } from "react";

export default function useWordle(solution)
{
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [allGuesses, setAllGuesses] = useState([...Array(6)]);
    const [guessHistory, setGuessHistory] = useState([]); //guesses as strings, to make sure the user doesn't submit the same word twice
    const [usedKeys, setUsedKeys] = useState({});
    const [gameOver, setGameOver] = useState(0);

    function addGuess()
    {
        //
    }

    function handleKeyup()
    {
        //
    }

    return { turn, currentGuess, allGuesses, guessHistory, usedKeys, gameOver, handleKeyup }
}