import PropTypes from "prop-types";

const Progress = ({
  progress,
  height = "h-2",
  color = "bg-blue-500",
  bgColor = "bg-gray-200",
  showLabel = false,
  labelPosition = "inside",
  labelColor = "text-white",
  labelSize = "text-xs",
  rounded = "rounded-full",
  striped = false,
  animated = false,
  transition = "transition-all duration-300 ease-out",
  className = "",
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const getLabelPositionClasses = () => {
    switch (labelPosition) {
      case "inside":
        return "absolute inset-0 flex items-center justify-center";
      case "outside-right":
        return "ml-2";
      case "outside-left":
        return "mr-2";
      case "top":
        return "mb-1 block w-full text-center";
      case "bottom":
        return "mt-1 block w-full text-center";
      default:
        return "absolute inset-0 flex items-center justify-center";
    }
  };
  return (
    <div className={`${className}`}>
      {showLabel && labelPosition === "top" && (
        <span
          className={`${getLabelPositionClasses()} ${labelColor} ${labelSize}`}
        >
          {clampedProgress}%
        </span>
      )}

      <div
        className={`flex ${
          labelPosition === "outside-left" ? "items-center" : ""
        } ${labelPosition === "outside-right" ? "items-center" : ""}`}
      >
        {showLabel && labelPosition === "outside-left" && (
          <span
            className={`${getLabelPositionClasses()} ${labelColor} ${labelSize}`}
          >
            {clampedProgress}%
          </span>
        )}

        <div
          className={`w-full ${bgColor} ${rounded} overflow-hidden`}
          style={{ height: height.replace("h-", "") + "px" }}
        >
          <div
            className={`${color} ${rounded} ${transition} ${
              striped ? "striped" : ""
            } ${animated ? "animated" : ""}`}
            style={{
              width: `${clampedProgress}%`,
              height: "100%",
              backgroundImage: striped
                ? "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)"
                : "none",
              backgroundSize: striped ? "1rem 1rem" : "auto",
              animation: animated
                ? "progress-bar-stripes 1s linear infinite"
                : "none",
            }}
          >
            {showLabel && labelPosition === "inside" && (
              <span
                className={`${getLabelPositionClasses()} ${labelColor} ${labelSize}`}
              >
                {clampedProgress}%
              </span>
            )}
          </div>
        </div>

        {showLabel && labelPosition === "outside-right" && (
          <span
            className={`${getLabelPositionClasses()} ${labelColor} ${labelSize}`}
          >
            {clampedProgress}%
          </span>
        )}
      </div>

      {showLabel && labelPosition === "bottom" && (
        <span
          className={`${getLabelPositionClasses()} ${labelColor} ${labelSize}`}
        >
          {clampedProgress}%
        </span>
      )}
    </div>
  );
};

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  bgColor: PropTypes.string,
  showLabel: PropTypes.bool,
  labelPosition: PropTypes.oneOf([
    "inside",
    "outside-right",
    "outside-left",
    "top",
    "bottom",
  ]),
  labelColor: PropTypes.string,
  labelSize: PropTypes.string,
  rounded: PropTypes.string,
  striped: PropTypes.bool,
  animated: PropTypes.bool,
  transition: PropTypes.string,
  className: PropTypes.string,
};

Progress.defaultProps = {
  height: "h-2",
  color: "bg-blue-500",
  bgColor: "bg-gray-200",
  showLabel: false,
  labelPosition: "inside",
  labelColor: "text-white",
  labelSize: "text-xs",
  rounded: "rounded-full",
  striped: false,
  animated: false,
  transition: "transition-all duration-300 ease-out",
  className: "",
};

export default Progress;
