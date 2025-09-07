import PropTypes from "prop-types";
import { useField } from "formik";

const Switch = ({
  name,
  label,
  labelPosition = "right", // 'left' or 'right'
  disabled = false,
  fieldClassName = "",
  labelClassName = "",
  errorClassName = "",
  containerClassName = "",
  activeColor = "bg-blue-500", // Tailwind class for active state
  inactiveColor = "bg-gray-300", // Tailwind class for inactive state
  thumbColor = "bg-white", // Tailwind class for the thumb
  ...restProps
}) => {
  const [field, meta, helpers] = useField(name);

  const handleToggle = () => {
    if (!disabled) {
      helpers.setValue(!field.value);
    }
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div className="flex items-center">
        {label && labelPosition === "left" && (
          <label
            htmlFor={name}
            className={`mr-2 cursor-pointer ${labelClassName} ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleToggle}
          >
            {label}
          </label>
        )}

        <button
          type="button"
          id={name}
          disabled={disabled}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            field.value ? activeColor : inactiveColor
          } ${fieldClassName} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleToggle}
          {...restProps}
        >
          <span
            className={`${
              field.value ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform rounded-full transition-transform ${thumbColor}`}
          />
        </button>

        {label && labelPosition === "right" && (
          <label
            htmlFor={name}
            className={`ml-2 cursor-pointer ${labelClassName} ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleToggle}
          >
            {label}
          </label>
        )}
      </div>

      {meta.touched && meta.error && (
        <div className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(["left", "right"]),
  disabled: PropTypes.bool,
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  activeColor: PropTypes.string, // Tailwind color class for active state
  inactiveColor: PropTypes.string, // Tailwind color class for inactive state
  thumbColor: PropTypes.string, // Tailwind color class for the thumb
};

export default Switch;


// inside Form we write : 
// const initialValues = {
//     notificationsEnabled : false  ,
//   };

//   const validationSchema = Yup.object().shape({
//     notificationsEnabled: Yup.boolean().required(
//       "You must choose whether to enable notifications"
//     ),
//   });

{/* <Switch
  name="notificationsEnabled"
  label="Enable notifications"
  labelPosition="right"
  activeColor="bg-green-500"
  inactiveColor="bg-gray-400"
/>; */}