import './assembledmodules.css'
import TypeDot from '../modules/TypeDot'
import { useEffect, useState } from 'react';

function TypeFilterModule({ radius, type, onTypeFilterChange}) {
  const [typeToFilter, setTypeToFilter] = useState([]);
  
  const iconMap = {
    ARTIFACT: "/src/assets/card_types/Artifact.svg",
    CREATURE: "/src/assets/card_types/Creature.svg",
    ENCHANTMENT: "/src/assets/card_types/Enchantment.svg",
    INSTANT: "/src/assets/card_types/Instant.svg",
    LAND: "/src/assets/card_types/Land.svg",
    MULTIPLE: "/src/assets/card_types/Multiple.svg",
    PLANESWALKER: "/src/assets/card_types/Planeswalk.svg",
    SORCERY: "/src/assets/card_types/Sorcery.svg"

};


  const handleChange = (typeValue, checked) => {
    if (checked) {
        setTypeToFilter([...typeToFilter, typeValue]);
    } else {
        setTypeToFilter(typeToFilter.filter((type) => type !== typeValue));
    }
  };

  useEffect(() => {
    onTypeFilterChange(typeToFilter);
  }, [typeToFilter, onTypeFilterChange]);

  useEffect(() => {
    console.log("TypeFilterModule typeToFilter value: ", typeToFilter);
  }, [typeToFilter])

  return (
    <div className='grid-container-dot grid-container div-fullrow'>
      <TypeDot className="grid-item dot" radius={radius} type={'CREATURE'} iconMap={iconMap} typeValue={"Creature"} onChange={handleChange}/>
      <TypeDot className="grid-item dot" radius={radius} type={'INSTANT'} iconMap={iconMap} typeValue={"Instant"} onChange={handleChange}/>
      <TypeDot className="grid-item dot" radius={radius} type={'SORCERY'} iconMap={iconMap} typeValue={"Sorcery"} onChange={handleChange}/>
      <TypeDot className="grid-item dot" radius={radius} type={'ENCHANTMENT'} iconMap={iconMap} typeValue={"Enchantment"} onChange={handleChange}/>
      <TypeDot className="grid-item dot" radius={radius} type={'ARTIFACT'} iconMap={iconMap} typeValue={"Artifact"} onChange={handleChange}/>
      <TypeDot className="grid-item dot" radius={radius} type={'PLANESWALKER'} iconMap={iconMap} typeValue={"Planeswalker"} onChange={handleChange}/>
      <TypeDot className="grid-item dot" radius={radius} type={'LAND'} iconMap={iconMap} typeValue={"Land"} onChange={handleChange}/>
    </div> 
  )
}
  
export default TypeFilterModule