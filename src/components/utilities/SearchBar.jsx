import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi"; 
const Searchbar = ({
  onChange,
  className = "",
}) => {
  return (
    <div className="mb-4">
      <div className="relative w-full max-w-md ">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch />
        </div>
        <input
          type="text"
          onChange={onChange}
          className={`w-full pl-10 px-4 py-2 bordered ${className}`}
          autoFocus={true}
        />
      </div>
    </div>
  );
};

Searchbar.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Searchbar;
