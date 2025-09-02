import PropTypes from "prop-types";

const Spinner = ({
  size = "md",
  color = "primary",
  thickness = "2px",
  speed = "0.5s",
  className = "",
  center = false,
  text = "",
  textPosition = "bottom",
  textColor = "current",
  textSize = "base",
}) => {
  // Size mapping
  const sizeClasses = {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  // Color mapping
  const colorClasses = {
    primary: "text-black",
    secondary: "text-gray-600",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-cyan-600",
    light: "text-gray-300",
    dark: "text-gray-800",
    white: "text-white",
  };

  const textColorClasses = {
    current: "text-current",
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-cyan-600",
    light: "text-gray-300",
    dark: "text-gray-800",
    white: "text-white",
  };

  // Text size mapping
  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Animation style
  const spinnerStyle = {
    animation: `spin ${speed} linear infinite`,
    borderWidth: thickness,
  };

  const containerClasses = `${
    center ? "flex flex-col items-center justify-center" : "inline-block"
  } ${className}`;
  const spinnerClasses = `inline-block ${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`;

  return (
    <div className={` fixed inset-0 ms-48 ${containerClasses}`}>
      {text && textPosition === "top" && (
        <span
          className={`${textColorClasses[textColor]} ${textSizeClasses[textSize]} block mb-2`}
        >
          {text}
        </span>
      )}
      <div className={spinnerClasses} style={spinnerStyle} role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      {text && textPosition === "bottom" && (
        <span
          className={`${textColorClasses[textColor]} ${textSizeClasses[textSize]} block mt-2`}
        >
          {text}
        </span>
      )}
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "white",
  ]),
  thickness: PropTypes.string,
  speed: PropTypes.string,
  className: PropTypes.string,
  center: PropTypes.bool,
  text: PropTypes.string,
  textPosition: PropTypes.oneOf(["top", "bottom"]),
  textColor: PropTypes.oneOf([
    "current",
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "white",
  ]),
  textSize: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl"]),
};

export default Spinner


{/* <Spinner center size="xl" speed=".8s" text="Loading data..." /> */}
