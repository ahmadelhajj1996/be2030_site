import React from "react";
import PropTypes from "prop-types";

const Grid = ({
  children,
  cols = 3,
  gap = 4,
  rowGap = null,
  colGap = null,
  className = "",
  itemClassName = "",
  ...props
}) => {
  const gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  const gridGap = rowGap || colGap ? `${rowGap || gap} ${colGap || gap}` : gap;

  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns,
        gap: gridGap,
      }}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className={itemClassName}>
          {child}
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.number,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rowGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  colGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  itemClassName: PropTypes.string,
};

export default Grid;


{/* <Grid
  cols={3}
  gap={48}
  className="p-4 bg-gray-50 rounded-lg bordered"
  itemClassName="text-center bordered p-2  "
>
  <div className="block">1</div>
  <div className="block">2</div>
  <div className="block">3</div>
  <div className="block">4</div>
</Grid>; */}