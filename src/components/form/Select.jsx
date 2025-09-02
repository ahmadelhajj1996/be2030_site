import PropTypes from "prop-types";
import { useField } from "formik";

const Select = ({
  name,
  label,
  options = [],
  fieldClassName = "",
  labelClassName = "",
  errorClassName = "",
  containerClassName = "",
  placeholder = "",
  firstOptionDisabled = true,
  firstOptionText = "Select an option",
  ...restProps
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label htmlFor={name} className={`block mb-1 ${labelClassName}`}>
          {label}
        </label>
      )}
      <select
        {...field}
        id={name}
        className={`w-full px-3 py-2 border rounded-md ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        } ${fieldClassName}`}
        {...restProps}
      >
        {placeholder && (
          <option value="" disabled={firstOptionDisabled}>
            {placeholder || firstOptionText}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string,
  firstOptionDisabled: PropTypes.bool,
  firstOptionText: PropTypes.string,
};

export default Select;
