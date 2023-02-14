import './assembledmodules.css'
import ColorDot from '../modules/ColorDot'

function ColorFilter({ radius, color}) {

    return (
      <div className='grid-container-colordot grid-container div-fullrow'>
        <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-white)"}/>
        <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-blue)"}/>
        <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-black)"}/>
        <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-red)"}/>
        <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-green)"}/>
      </div>
      
    )
  }
  
  export default ColorFilter