import DeckCard from '../modules/DeckCard'

function DeckListAssembler() {

    return ( 
      <DeckCard name={"Template Name"} image={"https://www.artofmtg.com/wp-content/uploads/2023/01/Infested-Fleshcutter-Phyrexia-All-Will-Be-One-MtG-Art-1536x864.jpg"} deckSize={75} collected={62} colors={['R','G','B']}/>
    )
  }
  
  export default DeckListAssembler