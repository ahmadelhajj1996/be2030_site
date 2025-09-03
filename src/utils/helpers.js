export function filterData(
  data,
  searchTerm,
  searchFields = [],
  formatOptions = {}
) {
  if (!data) return [];

  // Return all data if no search term or empty after trimming
  const processedSearchTerm = searchTerm?.trim();
  if (!processedSearchTerm) {
    return formatData(data, formatOptions);
  }

  const normalizedSearchTerm = processedSearchTerm
    .replace(/\s+/g, " ")
    .toLowerCase();

  // Filter the data
  const filteredData = data.filter((item) => {
    // If no specific fields provided, search in all string/number fields
    const fieldsToSearch =
      searchFields.length > 0
        ? searchFields
        : Object.keys(item).filter((key) => {
            const value = item[key];
            return typeof value === "string" || typeof value === "number";
          });

    return fieldsToSearch.some((field) => {
      const fieldValue = item[field];
      if (fieldValue === undefined || fieldValue === null) return false;

      const stringValue = fieldValue.toString().toLowerCase();

      // Exact match for ID fields
      if (field === "id" && stringValue === normalizedSearchTerm) {
        return true;
      }

      // Handle wildcard searches (with %)
      if (normalizedSearchTerm.includes("%")) {
        const regexPattern = normalizedSearchTerm
          .replace(/%/g, ".*") // Convert % to .* in regex
          .replace(/\*/g, "\\*"); // Escape actual asterisks
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(stringValue);
      }

      // Standard contains search
      if (stringValue.includes(normalizedSearchTerm)) {
        return true;
      }

      // Split search term into parts and check if all parts exist in the field
      const searchParts = normalizedSearchTerm.split(" ");
      if (searchParts.length > 1) {
        return searchParts.every((part) => stringValue.includes(part));
      }

      return false;
    });
  });

  return formatData(filteredData, formatOptions);
}


function formatData(data, formatOptions = {}) {
  if (Object.keys(formatOptions).length === 0) return data;

  return data.map((item) => {
    const formattedItem = { ...item };
    Object.entries(formatOptions).forEach(([field, formatter]) => {
      if (item[field] !== undefined && item[field] !== null) {
        formattedItem[field] = formatter(item[field]);
      }
    });
    return formattedItem;
  });
}


export const formatDate = (dateInput) => {
  // If already a Date object, use it; otherwise, try to parse it
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new TypeError(
      "Invalid date value provided (must be Date or ISO string)"
    );
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} at ${hours}::${minutes}:${seconds}`;
};









// For delete ... 

export const filterAndFormatData = (
  data,
  searchTerm,
  searchFields = [],
  formatOptions = {}
) => {
  return data
    .filter((item) => {
      if (!searchTerm) return true;

      // Remove all spaces from the search term
      const processedSearchTerm = searchTerm.replace(/\s/g, "").toLowerCase();
      if (!processedSearchTerm) return true; // If after removing spaces it's empty

      if (processedSearchTerm.includes("%")) {
        const regexPattern = processedSearchTerm
          .replace(/%/g, ".*") // Convert % to .* in regex
          .replace(/\*/g, "\\*"); // Escape actual asterisks

        const regex = new RegExp(`^${regexPattern}$`);

        return searchFields.some((field) => {
          // Remove all spaces from the field value before comparing
          const fieldValue = item[field]
            ?.toString()
            .replace(/\s/g, "")
            .toLowerCase();
          return fieldValue && regex.test(fieldValue);
        });
      }

      // Default contains search if no % wildcards
      return searchFields.some((field) => {
        // Remove all spaces from the field value before comparing
        const fieldValue = item[field]
          ?.toString()
          .replace(/\s/g, "")
          .toLowerCase();
        return fieldValue && fieldValue.includes(processedSearchTerm);
      });
    })
    .map((item) => {
      const formattedItem = { ...item };
      Object.entries(formatOptions).forEach(([field, formatter]) => {
        if (item[field] !== undefined && item[field] !== null) {
          formattedItem[field] = formatter(item[field]);
        }
      });
      return formattedItem;
    });
};
