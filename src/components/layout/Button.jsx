import PropTypes from "prop-types";
  
const Button = ({
  children,
  variant = "primary",
  size = "small",
  disabled = false,
  className = "",
  onClick,
  type = "submit",
  style,
  ariaLabel,
  loading = false,
  prefixIcon,
  loadingText,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded bordered  transition-colors  disabled:cursor-not-allowed flex items-center justify-center";

  const variantClasses = {
    primary: "textb  hover:texth",
    danger: "",
  };

  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const paddingClasses = {
    small: children ? "px-3 py-2.5" : "p-2",
    medium: children ? "px-4 py-2" : "p-3",
    large: children ? "px-6 py-3" : "p-4",
  };

  const isIconOnly = !children && (prefixIcon || loading);

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.medium}
    ${paddingClasses[size] || paddingClasses.medium}
    ${isIconOnly ? "!p-0" : ""}
    ${className}
  `;

  const buttonContent = loading ? loadingText || children : children;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      aria-label={
        ariaLabel ||
        (typeof children === "string" ? children : undefined) ||
        (isIconOnly ? "Button" : undefined)
      }
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="inline-flex items-center">
          <svg
            className={`animate-spin h-4 w-4 text-current ${
              children || loadingText ? "mr-2" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}

      {!loading && prefixIcon && (
        <span className={children ? "mr-2" : ""}>{prefixIcon}</span>
      )}

      {buttonContent}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["primary", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  style: PropTypes.object,
  ariaLabel: PropTypes.string,
  loading: PropTypes.bool,
  prefixIcon: PropTypes.node,
  loadingText: PropTypes.string,
};

export default Button;



// import { FiDownload, FiSave } from "react-icons/fi";
// const handleDownload = () => {
//   setIsLoading(true);
//   setTimeout(() => {
//     setIsLoading(false);
//   }, 2000);
// };

// const handleSave = () => {
//   setIsSaving(true);
//   setTimeout(() => {
//     setIsSaving(false);
//   }, 1500);
// };
//   return (
//     <div className="space-y-4 p-4">
//       {/* Button with loading state and custom loading text */}
//       <Button
//         onClick={handleDownload}
//         loading={isLoading}
//         loadingText="Downloading..."
//         variant="primary"
//         className="w-[250px]"
//       >
//         Download 
//       </Button>

//       {/* Button with prefix icon */}
//       <Button
//         prefixIcon={<FiDownload  />}
//         className="w-[30px] h-[30px]"
//       > 
        
//       </Button>

//       {/* Button with loading state and prefix icon (icon disappears during loading) */}
//       <Button
//         onClick={handleSave}
//         loading={isSaving}
//         prefixIcon={<FiSave className="text-lg" />}
//         variant="secondary"
//       >
//         {isSaving ? "Saving..." : "Save Changes"}
//       </Button>

//       {/* Danger button with loading state */}
//       <Button
//         onClick={() => alert("Deleted!")}
//         variant="danger"
//         loadingText="Deleting..."
//       >
//         Delete Account
//       </Button>
//     </div>
//   );