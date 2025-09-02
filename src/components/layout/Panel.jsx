
import PropTypes from "prop-types";

const Panel = ({
  title,
  children,
  headerContent,
  footerContent,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  variant = "default",  
  rounded = "md",
  shadow = "md",
  border = true,
  hoverEffect = false,
}) => {
  // Variant styles
  const variantStyles = {
    default: {
      bg: "bg-white",
      text: "text-gray-800",
      border: "border-gray-200",
    },
    primary: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-200",
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      border: "border-yellow-200",
    },
    danger: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-200",
    },
  };

  // Get current variant
  const currentVariant = variantStyles[variant] || variantStyles.default;

  // Dynamic classes
  const panelClasses = [
    className,
    currentVariant.bg,
    currentVariant.text,
    border ? `border ${currentVariant.border}` : "",
    rounded ? `rounded-${rounded}` : "",
    shadow ? `shadow-${shadow}` : "",
    hoverEffect ? "transition-transform duration-200 hover:scale-[1.01]" : "",
  ].join(" ");

  const headerClasses = [
    "px-4 py-3",
    headerClassName,
    border ? "border-b" : "",
    currentVariant.border,
  ].join(" ");

  const bodyClasses = ["px-4 py-4", bodyClassName].join(" ");
  const footerClasses = [
    "px-4 py-3",
    footerClassName,
    border ? "border-t" : "",
    currentVariant.border,
  ].join(" ");

  return (
    <div className={panelClasses}>
      {(title || headerContent) && (
        <div className={headerClasses}>
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {headerContent && <div>{headerContent}</div>}
        </div>
      )}
      <div className={bodyClasses}>{children}</div>
      {footerContent && <div className={footerClasses}>{footerContent}</div>}
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  headerContent: PropTypes.node,
  footerContent: PropTypes.node,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "success",
    "warning",
    "danger",
  ]),
  rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "xl", "full"]),
  shadow: PropTypes.oneOf(["none", "sm", "md", "lg", "xl", "2xl"]),
  border: PropTypes.bool,
  hoverEffect: PropTypes.bool,
};

Panel.defaultProps = {
  title: "",
  headerContent: null,
  footerContent: null,
  className: "",
  headerClassName: "",
  bodyClassName: "",
  footerClassName: "",
  variant: "default",
  rounded: "md",
  shadow: "md",
  border: true,
  hoverEffect: false,
};

export default Panel;


{/* <Panel
  title="User Stats"
  headerContent={<button className="text-sm text-blue-600">Refresh</button>}
  footerContent={
    <div className="text-sm text-gray-500">Last updated: 5 mins ago</div>
  }
  shadow="lg"
  hoverEffect
>
  <Grid
    cols={2}
    gap={24}
    className="p-4 bg-gray-50 rounded-lg bordered"
    itemClassName="text-center bordered p-2  "
  >
    <div>Total Users: 1,234</div>
    <div>Active: 876</div>
    <div>New: 45</div>
  </Grid>
</Panel>; */}