import Row from "../components/Row";

export default function Grid(props)
{
    return (
        <div className="grid">
        {
            props.allGuesses.map((guess, index) => {
                if(props.turn == index)
                    return <Row key={index} currentGuess={props.currentGuess} />
                return <Row key={index} guess={guess} />
            })
        }
        </div>
    );
}