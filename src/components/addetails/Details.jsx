import PropTypes from "prop-types";

export const DetailItem = ({ label, value, className , onClick }) => (
  <div className="flex ">
    <p>{label} : </p>
    <p className={` ms-1 ${className}`} onClick={onClick} >
      {value || "-"}
    </p>
  </div>
);

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};


