import '../index.css'
import './modules.css'

function Numberbar(props) {
  
    const handleInput = (e) => {
        const inputVal = parseInt(e.target.value);
        if (inputVal >= 0 && inputVal <= 999) {
            props.onCountChange(inputVal);
        }
        else{
            props.onCountChange(0);
        }
    };

    return (
        <div className="card-add-num-wrapper">
            <input placeholder='0' className="num" value={props.count} onChange={handleInput} type="number" onFocus={(event) => event.target.select()}></input>
        </div>
    )
}
  
export default Numberbar