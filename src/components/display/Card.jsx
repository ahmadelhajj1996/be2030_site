import PropTypes from "prop-types";

const Card = ({
  children,
  photo = null,
  photoAlt = "",
  width = "w-full",
  height = "h-auto",
  padding = "p-0",
  rounded = "rounded-sm",
  shadow = "shadow-md",
  bgColor = "bg-white",
  className = "",
  photoClassName = "",
  photoDimensions = "w-12 h-12", 
  onPhotoClick = null,
}) => {
  return (
    <div
      className={`${width} ${height} ${padding} ${rounded} ${shadow} ${bgColor} ${className} flex flex-col`}
    >
      {photo && (
        <div className={`flex justify-center ${children ? 'mb-3' : ''}`}>
          <img
            src={photo}
            alt={photoAlt}
            className={`${photoDimensions} ${photoClassName} object-cover ${rounded} ${
              onPhotoClick ? "cursor-pointer" : ""
            }`}
            onClick={onPhotoClick}
          />
        </div>
      )}
      <div className="flex-1 pb-3">{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  photo: PropTypes.string,
  photoAlt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  rounded: PropTypes.string,
  shadow: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
  photoClassName: PropTypes.string,
  photoDimensions: PropTypes.string,
  onPhotoClick: PropTypes.func,
};

export default Card;
  

// update the children due to my requirements
{/* <Card
  photo="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTuC9mmY94xQnsssyLmoMg_4s0o9-vges7-RadKyHyE4AFSgWH843PKE3muXxd3StfloZGH28zhNHOTFphD8W3HrTNk6CDusH7VBZSEKg"
  photoAlt="User icon"
  photoDimensions="w-full h-full"
  width="w-64"
>
  <h3 className="text-lg font-semibold text-center">John Doe</h3>
  <p className="text-gray-600 text-center">john@example.com</p>
</Card>; */} 
