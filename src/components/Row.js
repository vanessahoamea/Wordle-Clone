export default function Row(props)
{
    //showing a past guess
    if(props.guess)
    {
        return (
            <div className="row">
            {
                props.guess.map((object, index) => {
                    return <div key={index} className={`guess-tile ${object.class}-tile`}>{object.letter}</div>
                })
            }
            </div>
        );
    }

    //showing the current guess
    if(props.currentGuess)
    {
        const lettersArray = [...props.currentGuess];
        return (
            <div className="row current-row free-row">
            {
                lettersArray.map((letter, index) => {
                    return <div key={index} className="guess-tile new-letter">{letter}</div>
                })
            }
            {
                [...Array(5 - lettersArray.length)].map((_, index) => {
                    return <div key={index} className="guess-tile"></div>
                })
            }
            </div>
        );
    }

    //showing a free row
    return (
        <div className="row free-row">
            <div className="guess-tile"></div>
            <div className="guess-tile"></div>
            <div className="guess-tile"></div>
            <div className="guess-tile"></div>
            <div className="guess-tile"></div>
        </div>
    );
}