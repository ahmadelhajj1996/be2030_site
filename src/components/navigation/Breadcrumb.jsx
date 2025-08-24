import { FiChevronLeft } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumb = ({ size = 24, color = 'currentColor', className = '', text = '' }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(-1); 
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex justify-center items-center gap-0 hover:opacity-80 hover:underline hover:underline-offset-4
        transition-opacity  ${className}`}
      aria-label="Go back"
    >
      <FiChevronLeft size={size} color={color}  />
      {text && <span style={{color : color}}  >{text}</span>}
    </button>
  );
};

Breadcrumb.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default Breadcrumb