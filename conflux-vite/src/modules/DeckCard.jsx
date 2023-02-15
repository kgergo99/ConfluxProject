import './modules.css'
import './deckcardeffects.css'

function DeckCard({ name, image, deckSize, collected, colors  }) {

    return (
      <div className='card-container'>
        <div className="div-card">
          <div className='card-content-container'>
            <h2 className='deck-name'>{name}</h2>
            <div className='collection-text-div'><h3>{collected} / {deckSize}</h3></div>
            <div className='collection-bar-div'></div>
          </div>
          
          <div className='deck-image-div'>
            <img src="https://www.mtgpics.com/pics/art/one/010.jpg"></img>
          </div>
          
        </div>
      </div>
      
    )
  }
  
  export default DeckCard
  