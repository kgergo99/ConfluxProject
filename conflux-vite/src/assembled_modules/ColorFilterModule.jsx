import './assembledmodules.css'
import ColorDot from '../modules/ColorDot'
import { useEffect, useState } from 'react';

function ColorFilterModule({ radius, color, onColorFilterChange}) {
  const [colorToFilter, setColorToFilter] = useState([]);
  
  const handleChange = (colorValue, checked) => {
    if (checked) {
      setColorToFilter([...colorToFilter, colorValue]);
    } else {
      setColorToFilter(colorToFilter.filter((color) => color !== colorValue));
    }
  };

  useEffect(() => {
    onColorFilterChange(colorToFilter);
  }, [colorToFilter, onColorFilterChange]);

  useEffect(() => {
    console.log("ColorFilterModule colorToFilter value: ", colorToFilter);
  }, [colorToFilter])

  return (
    <div className='grid-container-dot grid-container div-fullrow'>
      <ColorDot className="grid-item dot" radius={radius} colorValue={'W'} color={"var(--mtg-white)"} onChange={handleChange}/>
      <ColorDot className="grid-item dot" radius={radius} colorValue={'U'} color={"var(--mtg-blue)"} onChange={handleChange}/>
      <ColorDot className="grid-item dot" radius={radius} colorValue={'B'} color={"var(--mtg-black)"} onChange={handleChange}/>
      <ColorDot className="grid-item dot" radius={radius} colorValue={'R'} color={"var(--mtg-red)"} onChange={handleChange}/>
      <ColorDot className="grid-item dot" radius={radius} colorValue={'G'} color={"var(--mtg-green)"} onChange={handleChange}/>
      <ColorDot className="grid-item dot" radius={radius} colorValue={'X'} color={"var(--mtg-colorless)"} onChange={handleChange}/>
      <ColorDot className="grid-item dot" radius={radius} colorValue={'M'} useGradient={true} onChange={handleChange}/>
    </div> 
  )
}
  
export default ColorFilterModule