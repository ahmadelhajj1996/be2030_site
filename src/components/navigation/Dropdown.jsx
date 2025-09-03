import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Dropdown = ({
  options,
  onSelect,
  placeholder = "Select an option",
  disabled = false,
  position = "left",
  triggerClassName = "",
  menuClassName = "",
  optionClassName = "",
  selectedOption,
  renderTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState("auto");
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate menu width when options change or menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const width = menuRef.current.getBoundingClientRect().width;
      setMenuWidth(`${width}px`);
    }
  }, [isOpen, options]);

  const selectedLabel =
    options.find((opt) => opt.value === selectedOption)?.label || placeholder;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger */}
      {renderTrigger ? (
        <div onClick={toggleDropdown}>{renderTrigger(isOpen)}</div>
      ) : (
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          style={{ width: isOpen ? menuWidth : "auto" }}
          className={`inline-flex justify-between items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-100 ${triggerClassName} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="truncate">{selectedLabel}</span>
          <svg
            className={`-mr-1 ml-2 h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`origin-top-right absolute ${
            position === "right" ? "right-0" : "left-0"
          } mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${menuClassName}`}
          style={{ minWidth: "112px" }} 
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                  option.value === selectedOption
                    ? "bg-gray-100 text-gray-900"
                    : ""
                } ${optionClassName}`}
                role="menuitem"
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  position: PropTypes.oneOf(["left", "right"]),
  triggerClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  optionClassName: PropTypes.string,
  selectedOption: PropTypes.string,
  renderTrigger: PropTypes.func,
};

Dropdown.defaultProps = {
  placeholder: "Select an option",
  disabled: false,
  position: "left",
  triggerClassName: "",
  menuClassName: "",
  optionClassName: "",
  selectedOption: undefined,
  renderTrigger: undefined,
};

export default Dropdown;


{/* <Dropdown
  options={filterOptions}
  onSelect={handleFilterSelect}
  placeholder="Filter users"
  selectedOption={selectedFilter}
/>; */}