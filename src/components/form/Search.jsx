import PropTypes from "prop-types";

const Search = ({
  value,
  onChange,
  placeholder = "Search here",
  className = "",
  ...props
}) => {
  return (
    <input
      type="text"
      value={value}
      autoFocus
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 bordered rounded focus:border-transparent transition-all ${className}`}
      {...props}
    />
  );
};

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Search;
