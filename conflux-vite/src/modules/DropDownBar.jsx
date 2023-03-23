import './dropdownbar.css'
import '../index.css'
import './modules.css'

function DropDownBar({ options, iconUrl, onSubmit, onChange }) {
  
    const handleReturn = (event) => {
        event.preventDefault();
        const selectedOption = event.target.elements.sortBy.value;
        console.log("Sorting option changed: ", selectedOption)
        onSubmit(selectedOption);
    };

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        console.log("Sorting option changed: ", selectedOption)
        onSubmit(selectedOption);
    };
  
    return (
        <form className="search-form" onSubmit={handleReturn}>
            <select name="sortBy" onChange={handleOptionChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </form>
    )
}
  
export default DropDownBar