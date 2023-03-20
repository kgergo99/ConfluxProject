import './dropdownbar.css'
import '../index.css'
import './modules.css'

function DropDownBar({ options, iconUrl, onSubmit, onChange }) {
  
    const handleReturn = (event) => {
        event.preventDefault();
        const selectedOption = event.target.elements.sortBy.value;
        onSubmit(selectedOption);
    };
  
    return (
        <form className="search-form" onSubmit={handleReturn}>
            <select name="sortBy">
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <button className='button-submit' type="submit" title="Sort" style={ { background: `no-repeat center url(${iconUrl})` } }></button>
        </form>
    )
}
  
export default DropDownBar