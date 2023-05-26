import { useEffect, useState } from "react";
import Wordle from "../components/Wordle";

export default function Game()
{
    const [solution, setSolution] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/word")
        .then(resp => resp.json())
        .then(resp => {
            setSolution(resp.word);
            console.log(resp.word); //for testing
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <>
            <header>
                <h1>Wordle</h1>
            </header>

            {
                solution &&
                <Wordle />
            }
        </>
    );
}