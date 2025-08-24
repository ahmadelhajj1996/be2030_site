import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const FilterControl = ({
  filterKey: initialFilterKey,
  filterOptions,
  onFilterChange,
  className = "",
  storageKey = "filterSelection", // Optional: allow customization of localStorage key
}) => {
  const [selectedFilter, setSelectedFilter] = useState(() => {
    // Initialize from localStorage if available, otherwise use the prop
    try {
      const savedValue = localStorage.getItem(storageKey);
      return savedValue !== null ? savedValue : initialFilterKey;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialFilterKey;
    }
  });

  useEffect(() => {
    // Update the selected filter when the prop changes (e.g., from parent component)
    setSelectedFilter(initialFilterKey);
  }, [initialFilterKey]);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      try {
        // Save to localStorage
        localStorage.setItem(storageKey, newValue);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      setSelectedFilter(newValue);
      onFilterChange(newValue);
    },
    [onFilterChange, storageKey]
  );

  return (
    <select
      name="filterkey"
      onChange={handleChange}
      value={selectedFilter}
      className={`px-3 py-2 bordered rounded focus:border-transparent transition-all w-[200px] ${className}`}
      aria-label="Filter options"
    >
      {filterOptions?.map((filter , index) => (
        <option key={index} value={filter.value}>
          {filter.label}
        </option>
      ))}
    </select>
  );
};

FilterControl.propTypes = {
  /** Currently selected filter key (initial value) */
  filterKey: PropTypes.string.isRequired,
  /** Array of available filter options */
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Callback function when filter changes */
  onFilterChange: PropTypes.func.isRequired,
  /** Additional className for styling */
  className: PropTypes.string,
  /** Key to use for localStorage persistence */
  storageKey: PropTypes.string,
};

export default FilterControl;
