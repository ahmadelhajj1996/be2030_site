// components/controls/OrderControl.jsx
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Ordercontrol = ({
  orderKey,
  orderDirection,
  orderOptions,
  onOrderChange,
}) => {
  const { t } = useTranslation();

  const handleDirectionToggle = useCallback(() => {
    onOrderChange(orderKey, orderDirection === "asc" ? "desc" : "asc");
  }, [orderKey, orderDirection, onOrderChange]);

  return (
    <div className="flex relative w-[220px]">
      <select
        name="orderkey"
        onChange={(e) => onOrderChange(e.target.value, orderDirection)}
        value={orderKey}
        className="px-3 py-2 w-4/5 bordered rounded focus:border-transparent transition-all"
      >
        {orderOptions.map((option) => (
          <option key={option} value={option}>
            {t(option.charAt(0).toUpperCase() + option.slice(1))}
            {orderKey === option && ` (${orderDirection})`}
          </option>
        ))}
      </select>
      {orderKey && (
        <button
          onClick={handleDirectionToggle}
          className="absolute end-0 inset-y-0 px-3 py-2 bordered"
          aria-label={`Sort ${
            orderDirection === "asc" ? "descending" : "ascending"
          }`}
        >
          {orderDirection === "asc" ? "↓ " : "↑ "}
        </button>
      )}
    </div>
  );
};

Ordercontrol.propTypes = {
  orderKey: PropTypes.string.isRequired,
  orderDirection: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default Ordercontrol;
