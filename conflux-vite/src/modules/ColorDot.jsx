import './modules.css'

function ColorDot({ radius, color }) {
    return (
        <label className='dot-container'>
            <input type="checkbox"></input>
            <span className="dot" style={ { backgroundColor: `${color}`,height: `${radius}`,width: `${radius}`,borderRadius: '50%',display: 'inline-block'}}></span>
        </label>
        
    )
}
  
export default ColorDot