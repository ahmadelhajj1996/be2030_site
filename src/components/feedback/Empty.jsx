import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../layout/Button";
import { TbError404 } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const Empty = ({
  title = "",
  description = "",
  icon = <TbError404 className="h-full w-full" color="black" />,
  image,
  action,
  size = "md",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  iconClassName = "",
  imageClassName = "",
  actionClassName = "",
  showBackButton = true,
  backButtonText = "translationKeys.backButtonText",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Size variants with responsive classes
  const sizeVariants = {
    sm: {
      iconSize: "h-6 w-6 sm:h-8 sm:w-8",
      titleSize: "text-base sm:text-lg",
      descriptionSize: "text-xs sm:text-sm",
    },
    md: {
      iconSize: "h-8 w-8 sm:h-12 sm:w-12",
      titleSize: "text-lg sm:text-xl",
      descriptionSize: "text-sm sm:text-base",
    },
    lg: {
      iconSize: "h-12 w-12 sm:h-16 sm:w-16",
      titleSize: "text-xl sm:text-2xl",
      descriptionSize: "text-base sm:text-lg",
    },
  };

  const selectedSize = sizeVariants[size] || sizeVariants.md;

  const defaultAction = showBackButton && !action && (
    <Button
      variant="primary"
      onClick={() => navigate(-1)}
      className="w-full sm:w-auto"
    >
      {t(backButtonText)}
    </Button>
  );

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 sm:p-6 text-center w-full ${className}`}
    >
      {/* Icon or Image */}
      {icon && !image && (
        <div className={`${selectedSize.iconSize} ${iconClassName}`}>
          {icon}
        </div>
      )}
      {image && (
        <img
          src={image}
          alt={t("translationKeys.emptyStateAltText")}
          className={`mx-auto ${selectedSize.iconSize} ${imageClassName}`}
          style={{ maxWidth: "100%" }}
        />
      )}

      {/* Title */}
      <h3
        className={`mt-3 sm:mt-4 font-medium ${selectedSize.titleSize} ${titleClassName}`}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={`mt-1 sm:mt-2 ${selectedSize.descriptionSize} ${descriptionClassName} max-w-md mx-auto`}
        >
          {description}
        </p>
      )}

      {(action || defaultAction) && (
        <div className={`mt-6 mx-auto ${actionClassName}`}>
          {action || defaultAction}
        </div>
      )}
    </div>
  );
};

Empty.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  image: PropTypes.string,
  action: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  descriptionClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  actionClassName: PropTypes.string,
  showBackButton: PropTypes.bool,
  backButtonText: PropTypes.string,
};

export default Empty;
