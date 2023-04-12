import './hitcounter.css'


function HitCounter(props) {
    //const [count, setCount] = useState(props.count);
    const decrementCount = () => {
        if(!(props.count <= 0)){
            //setCount(count - 1);
            props.onCountChange(props.count - 1);
        }
        else{
            //setCount(count);
            props.onCountChange(props.count);
        }
    };
    const incrementCount = () => {
        if (props.count >= 0 && props.count <= 998) {
            //setCount(count + 1);
            props.onCountChange(props.count + 1);
        }
        else{
            //setCount(count);
            props.onCountChange(props.count);
        }
    };
    const handleInput = (e) => {
        const inputVal = parseInt(e.target.value);
        if (inputVal >= 0 && inputVal <= 999) {
            //setCount(inputVal);
            props.onCountChange(inputVal);
        }
        else{
            //setCount(0);
            props.onCountChange(0);
        }
    };

    return(
        <div className="wrapper">
            <span className="minus unselectable" onClick={decrementCount}>-</span>
            <input  className="num" value={props.count} onChange={handleInput} type="number" onFocus={(event) => event.target.select()}></input>
            <span className="plus unselectable" onClick={incrementCount}>+</span>
        </div>
    )
}

export default HitCounter