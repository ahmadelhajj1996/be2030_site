import { useState, useEffect, useMemo } from "react";

export default function useFilter(initialItems = [], filterConfig = {}) {
  const {
    filterKey: defaultFilterKey = "all",
    filterOptions = [],
    filterProperty = "",
    storageKey = "filter-preference",
  } = filterConfig;

  // Get initial filter from localStorage
  const getInitialFilter = () => {
    try {
      const savedFilter = localStorage.getItem(storageKey);
      return savedFilter ? savedFilter : defaultFilterKey;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return defaultFilterKey;
    }
  };

  const [currentFilter, setCurrentFilter] = useState(getInitialFilter);

  // Calculate filteredItems
  const filteredItems = useMemo(() => {
    if (!currentFilter || currentFilter.toLowerCase() === "all") {
      return initialItems;
    }
    return initialItems.filter(
      (item) =>
        String(item[filterProperty]).toLowerCase() ===
        String(currentFilter).toLowerCase()
    );
  }, [currentFilter, initialItems, filterProperty]);

  // Save filter preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, currentFilter);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [currentFilter, storageKey]);

  const handleFilterChange = (e) => {
    setCurrentFilter(e.target.value);
  };

  const resetFilter = () => {
    setCurrentFilter(defaultFilterKey);
  };

  return {
    filterKey: currentFilter,
    filteredItems,
    handleFilterChange,
    filterOptions,
    resetFilter,
  };
}


// // src/hooks/useDataFilter.js
// import { useState, useEffect } from "react";

// const useDataFilter = (
//   data,
//   {
//     initialFilterKey = "all",
//     filterOptions = ["all"],
//     filterProperty = "status",
//     storageKey = null,
//   } = {}
// ) => {
//   const [filterKey, setFilterKey] = useState(initialFilterKey);

//   // Load filter from localStorage if storageKey is provided
//   useEffect(() => {
//     if (storageKey) {
//       const savedFilter = localStorage.getItem(storageKey);
//       if (savedFilter && filterOptions.includes(savedFilter)) {
//         setFilterKey(savedFilter);
//       }
//     }
//   }, [storageKey, filterOptions]);

//   // Save filter to localStorage when it changes
//   useEffect(() => {
//     if (storageKey) {
//       localStorage.setItem(storageKey, filterKey);
//     }
//   }, [filterKey, storageKey]);

//   const filteredItems = data.filter((item) => {
//     if (filterKey === "all") return true;
//     return item[filterProperty] === filterKey;
//   });

//   const handleFilterChange = (newFilterKey) => {
//     if (filterOptions.includes(newFilterKey)) {
//       setFilterKey(newFilterKey);
//     }
//   };

//   return {
//     filterKey,
//     filteredItems,
//     handleFilterChange,
//     filterOptions,
//   };
// };

// export default useDataFilter;