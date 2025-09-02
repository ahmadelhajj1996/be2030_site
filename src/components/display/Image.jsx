import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Image = ({
  src,
  alt = "",
  className = "",
  fallback = null,
  ...props
}) => {
 const { t } = useTranslation();

 if (!src) {
    return (
      fallback || (
        <span className={`text-gray-400 ${className}`}>
          {t("ImageGallery.noImages")}
        </span>
      )
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (fallback) {
          e.currentTarget.style.display = "none";
        }
      }}
      {...props}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.node,
};

export default Image;
