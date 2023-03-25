import { Navigate } from 'react-router  ';
import { useNavigate } from 'react-router-dom';
import DeckCard from '../modules/DeckCard'

function DeckListAssembler(props) {

  const userDecks = props.userDecks;

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
      overflow: "scroll",
      
    },
  };

  const handleDeckEditClick = (deck) => {
    console.log("CLICKED_: ", deck)
    navigate('/deckbuilder', { state: { deck } });
    //Redirect to editor
  }

    return ( 
        <div className='deck-grid disable-scrollbars' style={stylingObject.grid}  >
          {userDecks.map((deck) => {
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