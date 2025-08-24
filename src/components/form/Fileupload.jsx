import PropTypes from "prop-types";
import { useField } from "formik";
import { useState, useMemo, useEffect , useRef } from "react";

const Fileupload = ({
  name,
  label,
  accept = "image/*",
  multiple = false,
  fieldClassName = "",
  labelClassName = "",
  errorClassName = "",
  containerClassName = "",
  disabled = false,
  initialPreview = null,
  helperText = "",
  preview = true,
  previewClassName = "mt-2 flex flex-wrap gap-2",
  previewImageClassName = "h-24 w-24 object-cover rounded border",
  ...restProps
}) => {
  const [field, meta, helpers] = useField(name);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);

  const inputRef = useRef(null); // Add this ref

  // Handle initial preview
  useEffect(() => {
    if (initialPreview) {
      setPreviewUrls([initialPreview]);
      setFileSelected(true);
    }
  }, [initialPreview]);

  const handleChange = (event) => {
    const files = event.currentTarget.files;
    const value = multiple ? Array.from(files) : files[0];
    helpers.setValue(value);

    if (preview && files && files.length > 0) {
      const urls = multiple
        ? Array.from(files).map((file) => URL.createObjectURL(file))
        : [URL.createObjectURL(files[0])];
      setPreviewUrls(urls);
      setFileSelected(true);
    } else {
      setPreviewUrls([]);
      setFileSelected(false);
    }
  };

  const handleRemove = () => {
    helpers.setValue(multiple ? [] : null);
    setPreviewUrls([]);
    setFileSelected(false);
    // document.getElementById(name).value = "";
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Clean up object URLs
  useMemo(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label htmlFor={name} className={`block mb-1 ${labelClassName}`}>
          {label}
        </label>
      )}

      <div
        className="relative"
        style={{ display: fileSelected && !multiple ? "none" : "block" }}
      >
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          ref={inputRef}
          onChange={handleChange}
          onBlur={field.onBlur}
          className={`block w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${fieldClassName}`}
          {...restProps}
        />
      </div>

      {helperText && !meta.error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}

      {meta.touched && meta.error && (
        <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {meta.error}
        </p>
      )}

      {preview && previewUrls.length > 0 && (
        <div className={previewClassName}>
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className={previewImageClassName}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Fileupload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  initialPreview: PropTypes.string,
  helperText: PropTypes.string,
  preview: PropTypes.bool,
  previewClassName: PropTypes.string,
  previewImageClassName: PropTypes.string,
};

export default Fileupload;
