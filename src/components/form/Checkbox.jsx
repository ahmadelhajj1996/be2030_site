import PropTypes from "prop-types";
import { useField } from "formik";

const Checkbox = ({
  name,
  label,
  fieldClassName = "",
  labelClassName = "",
  errorClassName = "",
  containerClassName = "",
  disabled = false,
  children,
  ...restProps
}) => {
  const [field, meta] = useField({
    name,
    type: "checkbox", // This is important for Formik to handle checkboxes correctly
  });

  return (
    <div className={`relative ${containerClassName}`}>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          {...field}
          type="checkbox"
          id={name}
          disabled={disabled}
          className={`form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          } ${fieldClassName}`}
          {...restProps}
        />
        {label && (
          <span className={`block ${labelClassName}`}>
            {label}
            {children}
          </span>
        )}
      </label>
      {meta.touched && meta.error && (
        <div className={`error-message ${errorClassName}`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Checkbox;


 