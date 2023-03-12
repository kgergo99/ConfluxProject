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

  useEffect(() => {
    console.log("RarityFilterModule rarityToFilter value: ", rarityToFilter);
  }, [rarityToFilter])

  return (
    <div className='grid-container-dot grid-container div-fullrow'>
      <RarityDot className="grid-item dot" radius={radius} rarityValue={"common"} onChange={handleChange}/>
      <RarityDot className="grid-item dot" radius={radius} rarityValue={"uncommon"} onChange={handleChange}/>
    </div> 
  )
}
  
export default RarityFilterModule