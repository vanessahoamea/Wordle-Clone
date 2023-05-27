import { useState } from "react";

export default function useWordle(solution, setShowStats)
{
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [allGuesses, setAllGuesses] = useState([...Array(6)]);
    const [guessHistory, setGuessHistory] = useState([]); //guesses as strings, to make sure the user doesn't submit the same word twice
    const [usedKeys, setUsedKeys] = useState({});
    const [gameOver, setGameOver] = useState(0); //0 is ongoing, -1 is loss, 1 is win

    function addGuess()
    {
        let solutionArray = [...solution];
        let guessArray = [...currentGuess].map((letter) => ({
            letter: letter,
            class: "gray"
        }));
        
        //format guess string as array
        guessArray.forEach((object, index) => {
            if(solutionArray[index] == object.letter)
            {
                object.class = "green";
                solutionArray[index] = null;
            }
            else if(solutionArray.includes(object.letter))
            {
                object.class = "yellow";
                solutionArray[solutionArray.indexOf(object.letter)] = null;
            }
        });

        //check for game over
        if(currentGuess == solution)
        {
            setGameOver(1);
            setTimeout(() => setShowStats(true), 2000);
        }
        else if(turn == 5)
        {
            setGameOver(-1);
            setTimeout(() => setShowStats(true), 2000);
        }

        //update board state
        setAllGuesses((prevAllGuesses) => {
            let newAllGuesses = [...prevAllGuesses];
            newAllGuesses[turn] = guessArray;
            return newAllGuesses;
        });
        setGuessHistory((prevGuessHistory) => [...prevGuessHistory, currentGuess]);
        setUsedKeys((prevUsedKeys) => {
            let newUsedKeys = {...prevUsedKeys};
            guessArray.map((object) => {
                if(newUsedKeys[object.letter] == "green" || (newUsedKeys[object.letter] == "yellow" && object.class == "gray"))
                    return;
                newUsedKeys[object.letter] = object.class;
            });
            return newUsedKeys;
        });
        setTurn((prevTurn) => prevTurn + 1);
        setCurrentGuess("");
    }

    function handleKeyup(event)
    {
        if(/^[a-zA-Z]$/.test(event.key) && currentGuess.length < 5)
            setCurrentGuess((prevGuess) => prevGuess + event.key.toLowerCase());
        else if(event.key == "Backspace" && currentGuess.length > 0)
            setCurrentGuess((prevGuess) => prevGuess.substring(0, currentGuess.length - 1));
        else if(event.key == "Enter")
        {
            if(turn > 5 || currentGuess.length < 5 || guessHistory.includes(currentGuess))
            {
                if(document.getElementsByClassName("current-row")[0])
                    document.getElementsByClassName("current-row")[0].classList.add("invalid-guess");
                return;
            }
            addGuess();
        }

        if(document.getElementsByClassName("current-row")[0])
            document.getElementsByClassName("current-row")[0].classList.remove("invalid-guess");
    }

    return { turn, currentGuess, allGuesses, usedKeys, gameOver, handleKeyup };
}