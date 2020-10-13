import React, {useCallback, useEffect, useState} from 'react';
import './Counter.css';
import button from './images/button.png'

function Counter() {
    const [counter, setCounter] = useState(-1)

    const fetchCounter = () => {
        fetch("http://localhost:3000/counter")
            .then(res => res.text())
            .then(res => setCounter(res))
    }

    useEffect(() => {
       fetchCounter()
    }, [])

    const onClick = useCallback(() => {fetchCounter()}, [])

    return (
        <div className="Counter">
            <div className="image" onClick={onClick}>
                <img src={button} />
            </div>
            {counter}
        </div>
    )
}

export default Counter;