import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Keys(props)
{
    const [keys, setKeys] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/keys")
        .then(resp => {
            if(resp.ok)
                return resp.json();
            return resp.json().then(response => { throw new Error(response.message) });
        })
        .then(resp => setKeys(resp.keys))
        .catch(err => console.log(err));
    }, []);

    function renderKeys(startIndex, endIndex)
    {
        const result = [];

        for(let i=startIndex; i<=endIndex; i++)
        {
            const color = props.usedKeys[keys[i]];
            result.push(
                <div data-test={`key-${keys[i]}`} key={i} className={`key ${color}-key`} onClick={() => pressKey(keys[i])}>
                    {i < 27 ? keys[i] : <FontAwesomeIcon icon={faDeleteLeft} />}
                </div>
            );
        }

        return result;
    }

    function pressKey(key)
    {
        if(props.gameOver != 0)
            return;
        props.handleKeyup(new KeyboardEvent("keyup", { "key": key }));
    }

    return (
        <div className="keypad">
            {keys && <div className="keypad-row">{renderKeys(0, 9)}</div>}
            {keys && <div className="keypad-row">{renderKeys(10, 18)}</div>}
            {keys && <div className="keypad-row">{renderKeys(19, 27)}</div>}
        </div>
    );
}