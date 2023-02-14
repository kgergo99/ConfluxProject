import './modules.css'

function ColorDot({ radius, color }) {
    const dotStyle = {
        backgroundColor: `${color}`,
        height: `${radius}`,
        width: `${radius}`,
        borderRadius: '50%',
        display: 'inline-block'
    };

    return (
        <div className='dot-container'>
            <input type="checkbox"></input>
            <span class="dot" style={ { backgroundColor: `${color}`,height: `${radius}`,width: `${radius}`,borderRadius: '50%',display: 'inline-block'}}></span>
        </div>
        
    )
  }
  
  export default ColorDot