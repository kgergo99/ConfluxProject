import './modules.css'
import React, { useState } from 'react';

function RarityDot({ radius, rarity, onChange}) {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        onChange(rarity, event.target.checked);
    };

    const backgroundStyle = {
        background: "linear-gradient(130deg, rgba(45,103,143,1) 0%, rgba(117,157,169,1) 19%, rgba(190,242,252,1) 45%, rgba(190,242,252,1) 55%, rgba(117,157,169,1) 80%, rgba(45,103,143,1) 100%);"};
        //common color

    return (
        <label className="dot-container dot-type">
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange}></input>
            <span className="dot" title={rarity} style={ { ...backgroundStyle, height: `${radius}`,width: `${radius}`,borderRadius: '50%',display: 'inline-block'}}></span>
        </label>
        
    )
}
  
export default RarityDot