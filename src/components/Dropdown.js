import chevLeft from "../assets/chevLeft.svg";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useState, useRef, useCallback } from "react";

const Dropdown = ({ options, handleSort, dropdownName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const handleOutsideClick = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  useOutsideClick([ref], handleOutsideClick);

  const handleDropDown = () => {
    setIsOpen((prev) => !prev);
    ref.current.focus();
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    handleSort(index);
    handleDropDown();
  };

  return (
    <div
      className="Dropdown"
      ref={ref}
      onClick={handleDropDown}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleDropDown();
        }
      }}
    >
      <h2>{dropdownName ? dropdownName : options[0]}</h2>
      <img
        src={chevLeft}
        alt="chev"
        className={`dropdown--arrow ${isOpen ? "active" : ""}`}
      />
      {isOpen && (
        <div className="dropdown--content active">
          {options &&
            options.map((option, index) => (
              <div
                className="dropdown--item"
                key={index}
                role="button"
                tabIndex={0}
                onClick={(e) => handleClick(e, index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClick(e, index);
                  }
                }}
              >
                <span>{option}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
