import { useState } from "react";
import './hitcounter.css'


function HitCounter() {
    const [count, setCount] = useState(0);
    const decrementCount = () => {
        if(!(count <= 0)){
            setCount(count - 1);
        }
        else{
            setCount(count);
        }
    };
    const incrementCount = () => {
        if (count >= 0 && count <= 998) {
            setCount(count + 1);
        }
        else{
            setCount(count);
        }
    };
    const handleInput = (e) => {
        const inputVal = parseInt(e.target.value);
        if (inputVal >= 0 && inputVal <= 999) {
            setCount(inputVal);
        }
        else{
            setCount(0);
        }
    };

    return(
        <div className="wrapper">
            <span className="minus unselectable" onClick={decrementCount}>-</span>
            <input  className="num" value={count} onChange={handleInput} type="number" onFocus={(event) => event.target.select()}></input>
            <span className="plus unselectable" onClick={incrementCount}>+</span>
        </div>
    )
}

export default HitCounter