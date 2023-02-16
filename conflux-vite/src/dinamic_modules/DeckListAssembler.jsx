import DeckCard from '../modules/DeckCard'

function DeckListAssembler() {

  var stylingObject = {
    div: {
      display: "grid",
      gap: "2rem",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    }
  };

    return ( 
      <div className='deck-grid' style={stylingObject.div}>
        <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={60} colors={['R','G','B']}/>
        <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={2} colors={['W','B']}/>
        <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={56} colors={['W','B']}/>
        <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={14} colors={['W','B']}/>
        <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={44} colors={['W','B']}/>
        <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={30} colors={['W','B']}/>
        <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={75} colors={['R','G','B']}/>
        <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={74} colors={['R','G','B']}/>
      </div>
      
    )
  }
  
  export default DeckListAssembler