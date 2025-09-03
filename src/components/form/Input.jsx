import PropTypes from "prop-types";
import { useField } from "formik";

const Input = ({
  name,
  label,
  type = "text",
  fieldClassName = "",
  labelClassName = "",
  errorClassName = "",
  containerClassName = "",
  placeholder = "",
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
      <input
        {...field}
        type={type}
        id={name}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bordered rounded-md  focus:border-none ${
          meta.touched && meta.error ? "border-red-500" : ""
        } ${fieldClassName}`}
        {...restProps}
      />
      {meta.touched && meta.error && (
        <div className={`error-message ${errorClassName}`}>{meta.error}</div>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "date",
    "time",
    "datetime-local",
    "search",
    "color",
  ]),
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
