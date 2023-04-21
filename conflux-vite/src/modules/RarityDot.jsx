import './modules.css'
import React, { useState } from 'react';

function RarityDot({ radius, rarity, onChange}) {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        onChange(rarity, event.target.checked);
    };

    const rarityBackgrounds = {
        common: 'linear-gradient(130deg, rgba(0,0,0,1) 10%, rgba(32,32,32,1) 50%, rgba(0,0,0,1) 90%)',
        uncommon: 'linear-gradient(130deg, rgba(81,113,127,1) 0%, rgba(182,217,231,1) 50%, rgba(81,113,127,1) 100%)',
        rare: 'linear-gradient(130deg, rgba(135,122,69,1) 0%, rgba(228,201,140,1) 50%, rgba(135,122,69,1) 100%)',
        mythic: 'linear-gradient(130deg, rgba(182,49,38,1) 10%, rgba(229,130,42,1) 50%, rgba(182,49,38,1) 90%)',
      };

    const backgroundStyle = {
        background: rarityBackgrounds[rarity],
    }
    return (
        <label className="dot-container dot-type d-flex align-content-center">
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange}></input>
            <span className="dot" title={rarity} style={ { ...backgroundStyle, height: `${radius}`,width: `${radius}`,borderRadius: '50%',display: 'inline-block'}}></span>
        </label>
        
    )
}
  
export default RarityDot