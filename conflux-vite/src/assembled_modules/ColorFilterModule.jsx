import './assembledmodules.css'
import ColorDot from '../modules/ColorDot'

function ColorFilter({ radius, color}) {

    return (
      <div className='grid-container-colordot grid-container div-fullrow'>
        <div className='checkbox-div-dot'>
          <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-white)"}/>
        </div>
        <div className='checkbox-div-dot'>
          <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-blue)"}/>
        </div>
        <div className='checkbox-div-dot'>
          <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-black)"}/>
        </div>
        <div className='checkbox-div-dot'>
          <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-red)"}/>
        </div>
        <div className='checkbox-div-dot'>
          <ColorDot className="grid-item dot" radius={radius} color={"var(--mtg-green)"}/>
        </div>
      </div>
      
    )
  }
  
  export default ColorFilter