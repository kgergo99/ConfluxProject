import './assembledmodules.css'
import RarityDot from '../modules/RarityDot';
import { useEffect, useState } from 'react';

function RarityFilterModule({ radius, onRarityFilterChange}) {
  const [rarityToFilter, setRarityToFilter] = useState([]);
  
  const handleChange = (rarity, checked) => {
    if (checked) {
        setRarityToFilter([...rarityToFilter, rarity]);
    } else {
        setRarityToFilter(rarityToFilter.filter((rare) => rare !== rarity));
    }
  };

  useEffect(() => {
    onRarityFilterChange(rarityToFilter);
  }, [rarityToFilter, onRarityFilterChange]);


  return (
    <div className='grid-container-dot grid-container d-flex align-content-center flex-wrap'>
      <RarityDot className="grid-item dot" radius={radius} rarity={"common"} onChange={handleChange}/>
      <RarityDot className="grid-item dot" radius={radius} rarity={"uncommon"} onChange={handleChange}/>
      <RarityDot className="grid-item dot" radius={radius} rarity={"rare"} onChange={handleChange}/>
      <RarityDot className="grid-item dot" radius={radius} rarity={"mythic"} onChange={handleChange}/>
    </div> 
  )
}
  
export default RarityFilterModule