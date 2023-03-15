import './searchbar.css'
import '../index.css'
import './modules.css'

function Searchbar({ placeholder_text, iconUrl, onSubmit }) {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;
    onSubmit(searchTerm);
    
  }
  
    return (
      <form className="search-form" onSubmit={handleSubmit}>
        <input type="search" placeholder={placeholder_text} name="searchTerm"/>
        <button type="submit" title="Search" style={ { background: `no-repeat center url(${iconUrl})`} }></button>
      </form>
    )
}
  
export default Searchbar