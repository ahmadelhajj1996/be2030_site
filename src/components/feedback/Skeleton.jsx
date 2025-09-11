import PropTypes from "prop-types";

const Skeleton = ({
  type = "rectangle",
  width = "100%",
  height = "20px",
  rounded = "md",
  color = "bg-green-700",
  // highlightColor = "bg-green-900",
  animation = "pulse",
  count = 1,
  className = "",
  style = {},
  // circle = false,
  lines = 1,
  gap = "10px",
  direction = "column",
}) => {
  // Handle different skeleton types
  const renderSkeleton = () => {
    switch (type) {
      case "circle":
        return (
          <div
            className={`rounded-full ${color} ${
              animation === "pulse"
                ? "animate-pulse"
                : animation === "wave"
                ? "animate-wave"
                : ""
            } ${className}`}
            style={{
              width,
              height,
              ...style,
            }}
          />
        );

      case "text":
        return Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${color} ${
              animation === "pulse"
                ? "animate-pulse"
                : animation === "wave"
                ? "animate-wave"
                : ""
            } ${index !== lines - 1 ? `mb-${gap}` : ""} ${className}`}
            style={{
              width: index === lines - 1 ? width : "100%",
              height,
              borderRadius: rounded ? `rounded-${rounded}` : "0",
              ...style,
            }}
          />
        ));

      case "rectangle":
      default:
        return (
          <div
            className={`${color} ${
              animation === "pulse"
                ? "animate-pulse"
                : animation === "wave"
                ? "animate-wave"
                : ""
            } ${className}`}
            style={{
              width,
              height,
              borderRadius: rounded ? `rounded-${rounded}` : "0",
              ...style,
            }}
          />
        );
    }
  };

  return (
    <div
      className={`${
        direction === "row" ? "flex items-center space-x-" + gap : ""
      }`}
      style={{ display: direction === "row" ? "flex" : "block" }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

Skeleton.propTypes = {
  type: PropTypes.oneOf(["rectangle", "circle", "text"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "xl", "full"]),
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  animation: PropTypes.oneOf(["none", "pulse", "wave"]),
  count: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  circle: PropTypes.bool,
  lines: PropTypes.number,
  gap: PropTypes.string,
  direction: PropTypes.oneOf(["row", "column"]),
};

Skeleton.defaultProps = {
  type: "rectangle",
  width: "100%",
  height: "20px",
  rounded: "md",
  color: "bg-gray-200",
  highlightColor: "bg-gray-300",
  animation: "pulse",
  count: 1,
  className: "",
  style: {},
  circle: false,
  lines: 1,
  gap: "10px",
  direction: "column",
};

export default Skeleton;


{/* <Skeleton type="text" lines={3} height=".5px" gap="8px" />; */}
