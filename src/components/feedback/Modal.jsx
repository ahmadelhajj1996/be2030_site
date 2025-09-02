import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  className1 = "",
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto  `}>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${className1} `}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={`relative  bg-white rounded-lg shadow-xl transform transition-all max-w-full ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="block absolute top-4 end-4 text-gray-800 hover:text-red-600"
            aria-label={t("modal.closeButtonAriaLabel")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-6 mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  className1: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
};

export default Modal;
