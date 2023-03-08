import './modules.css'
import React from 'react';

function ColorDot({ radius, color, useGradient = false }) {
    //const [useBackgroundGradient, setUseBackgroundGradient] = useState(useGradient);

    const backgroundStyle = useGradient ? {
        background: "linear-gradient(to top right, var(--start-color) 0%, var(--15-percent-color) 20%, var(--35-percent-color) 40%, var(--50-percent-color) 50%, var(--65-percent-color) 60%, var(--85-percent-color) 80%, var(--end-color) 100%)"
    } : {
        backgroundColor: color
    };

    return (
        <label className='dot-container'>
            <input type="checkbox"></input>
            <span className="dot" style={ { ...backgroundStyle,height: `${radius}`,width: `${radius}`,borderRadius: '50%',display: 'inline-block'}}></span>
        </label>
        
    )
}
  
export default ColorDot