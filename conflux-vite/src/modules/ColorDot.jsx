import './modules.css'
import React, { useState } from 'react';

function ColorDot({ radius, color, colorValue, useGradient = false, onChange}) {
    //const [useBackgroundGradient, setUseBackgroundGradient] = useState(useGradient);
    const [checked, setChecked] = useState(false);

    const backgroundStyle = useGradient ? {
        background: "linear-gradient(to top right, var(--start-color) 0%, var(--15-percent-color) 20%, var(--35-percent-color) 40%, var(--50-percent-color) 50%, var(--65-percent-color) 60%, var(--85-percent-color) 80%, var(--end-color) 100%)"
    } : {
        backgroundColor: color
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        onChange(colorValue, event.target.checked);
    };

    return (
        <label className='dot-container'>
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange}></input>
            <span className="dot" style={ { ...backgroundStyle,height: `${radius}`,width: `${radius}`,borderRadius: '50%',display: 'inline-block'}}>
                {useGradient && <img src={"/src/assets/simple-circle.svg"} style={{ height: '70%', width: '70%', margin: '15% 10%'}} />}
            </span>
        </label>
        
    )
}
  
export default ColorDot