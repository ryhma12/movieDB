import chevLeft from "../assets/chevLeft.svg";

const Dropdown = ({ options, handleSort, dropdownName }) => {
  const handleDropDown = () => {
    const content = document.querySelector(".dropdown--content");
    const arrow = document.querySelector(".dropdown--arrow");
    content.classList.toggle("active");
    arrow.classList.toggle("active");
  };

  return (
    <div className="Dropdown" onClick={handleDropDown}>
      <h2>{dropdownName ? dropdownName : options[0]}</h2>
      <img src={chevLeft} alt="chev" className="dropdown--arrow" />
      <div className="dropdown--content">
        {options &&
          options.map((option, index) => (
            <div
              className="dropdown--item"
              key={index}
              onClick={() => handleSort(index)}
            >
              <span>{option}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
