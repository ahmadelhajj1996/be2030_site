import PropTypes from "prop-types";
import { useField } from "formik";

const Textarea = ({
  name,
  label,
  rows = 4,
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
      <textarea
        {...field}
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border  ${
          meta.touched && meta.error ? "border-red-500" : ""
        } ${fieldClassName}`}
        {...restProps}
      />
      {meta.touched && meta.error && (
        <div className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rows: PropTypes.number,
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Textarea;


{/* <Textarea
  name="reason"
  label="Reason"
  rows={5}
  placeholder="Enter the reason for the warning please"
  containerClassName="mb-4"
  // fieldClassName="bg-gray-50"
/>; */}