import './modules.css'
import React, { useState } from 'react';

function TypeDot({ radius, type, typeValue, iconMap, onChange}) {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        onChange(typeValue, event.target.checked);
    };

    const icon = iconMap[type];
    console.log("icon type: ", icon);

    return (
        <label className="dot-container dot-type">
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange}></input>
            <span className="dot" title={type} style={ { backgroundColor: 'var(--light-grey)', height: `${radius}`,width: `${radius}`,borderRadius: '50%',display: 'inline-block'}}>
                <img src={icon} alt={type} style={{ height: '70%', width: '70%', margin: '15% 10%'}} />
            </span>
        </label>
        
    )
}
  
export default TypeDot