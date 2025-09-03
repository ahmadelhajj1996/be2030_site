import PropTypes from "prop-types";
import { useField } from "formik";

const DateInput = ({
  name,
  label,
  fieldClassName = "",
  labelClassName = "",
  errorClassName = "",
  containerClassName = "",
  placeholder = "",
  minDate,
  maxDate,
  ...restProps
}) => {
  const [field, meta, helpers] = useField(name);

  // Format the value for the input (YYYY-MM-DD)
  const formattedValue = field.value
    ? new Date(field.value).toISOString().split("T")[0]
    : "";

  // Handle date changes
  const handleChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // Convert to Date object and set time to noon to avoid timezone issues
      const date = new Date(dateValue);
      date.setHours(12, 0, 0, 0);
      helpers.setValue(date);
    } else {
      helpers.setValue(null);
    }
  };

  // Set default min/max dates if not provided
  const getMinDate = () => {
    if (minDate) return minDate;
    return ""; // No minimum by default
  };

  const getMaxDate = () => {
    if (maxDate) return maxDate;
    return "";
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        {...field}
        type="date"
        id={name}
        value={formattedValue}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        min={getMinDate()}
        max={getMaxDate()}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bordered ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        } ${fieldClassName}`}
        {...restProps}
      />
      {meta.touched && meta.error && (
        <div className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string,
  minDate: PropTypes.string, // Format: YYYY-MM-DD
  maxDate: PropTypes.string, // Format: YYYY-MM-DD
};

export default DateInput;
