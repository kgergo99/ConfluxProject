import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeckCard from '../modules/DeckCard'

function DeckListAssembler(props) {
  const userDecks = props.userDecks;
  const nameFilter = props.nameFilter;
  
  const [filteredDecks, setFilteredDecks] = useState(props.userDecks);

  const navigate = useNavigate();

  const fixedNavbarHeight = "210px";

  var stylingObject = {
    grid: {
      paddingTop: "20px",
      paddingRight: "40px",
      paddingLeft: "40px",
      display: "grid",
      gap: "2rem",
      maxHeight: `calc(100vh - ${fixedNavbarHeight})`,
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      
    },
  };

  useEffect(()=>{
    setFilteredDecks(userDecks);
  },[userDecks])

  useEffect(()=>{
    let newFilteredDecks = [];
    userDecks.forEach(deck => {
      if(nameFilter && deck.name.toLowerCase().includes(nameFilter.toLowerCase())){
        newFilteredDecks.push(deck);
      }
    });
    setFilteredDecks(nameFilter ? newFilteredDecks : userDecks);
  },[nameFilter])

  const handleDeckEditClick = (deck) => {
    console.log("CLICKED_: ", deck)
    navigate('/deckbuilder', { state: { deck } });
    //Redirect to editor
  }

    return ( 
        <div className='deck-grid' style={stylingObject.grid}  >
          {filteredDecks.map((deck) => {
                return (
                    <div key={deck.deckId}>
                        <DeckCard 
                          id={deck.deckId}
                          deck={deck}
                          name={deck.name} 
                          image={deck.coverImage} 
                          deckSize={deck.deckSize} 
                          collected={deck.collectedSize} 
                          onDeckEditClick={handleDeckEditClick}
                        />
                    </div>
                );
            })}
        </div>
    )
  }
  
  export default DeckListAssembler