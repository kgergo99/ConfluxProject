import './modules.css'
import './deckcardeffects.css'
import React from 'react';

function DeckCard({ deck, name, image, deckSize, collected, onDeckEditClick  }) {
    var collectedPercent = (collected / (deckSize / 100)) + '%'
    //document.documentElement.style.setProperty('--collected-percent', collectedPercent);

    const grey =getComputedStyle(document.documentElement).getPropertyValue('--grey');
    const barHeight =getComputedStyle(document.documentElement).getPropertyValue('--collection-bar-height');
    const maxWidth =getComputedStyle(document.documentElement).getPropertyValue('--max-width-deck');
    const borderRad =getComputedStyle(document.documentElement).getPropertyValue('--border-rad');
    const accentYellow =getComputedStyle(document.documentElement).getPropertyValue('--accent-yellow');

    var stylingObject = {
      div: {
        backgroundColor: `${grey}`,
        height: `${barHeight}`,
        width: `${maxWidth}`,
        borderRadius: `0 0 ${borderRad} ${borderRad}`,
        background: `linear-gradient(90deg, ${accentYellow} ${collectedPercent}, ${grey} ${collectedPercent}`
      }
    };

    const handleDeckClick = () => {
      onDeckEditClick(deck)
    }

    return (
      <div className='card-container' >
        <div className="div-card" onClick={handleDeckClick}>
          <div className='card-content-container'>
            <h2 className='deck-name'>{name}</h2>
            <div className='collection-text-div'><h3>{collected} / {deckSize}</h3></div>
            <div style={stylingObject.div}></div>
            
          </div>
          
          <div className='deck-image-div'>
            <img src={image}></img>
          </div>
          
        </div>
      </div>
      
    )
  }
  
  export default DeckCard
  