import DeckCard from '../modules/DeckCard'

function DeckListAssembler() {
  const fixedNavbarHeight = "270px";

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

    return ( 
        <div className='deck-grid disable-scrollbars' style={stylingObject.grid}  >
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={60} colors={['R','G','B']}/>
          <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={2} colors={['W','B']}/>
          <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={56} colors={['W','B']}/>
          <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={14} colors={['W','B']}/>
          <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={44} colors={['W','B']}/>
          <DeckCard name={"Template Name 2"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={30} colors={['W','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={75} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={74} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={74} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={74} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={74} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={74} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={74} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={0} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={32} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={2} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/010.jpg"} deckSize={75} collected={14} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={11} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={11} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={10} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={21} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={31} colors={['R','G','B']}/>
          <DeckCard name={"Template Name"} image={"https://www.mtgpics.com/pics/art/one/232.jpg"} deckSize={75} collected={10} colors={['R','G','B']}/>
        </div>
    )
  }
  
  export default DeckListAssembler