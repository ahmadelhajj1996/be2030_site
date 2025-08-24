import PropTypes from "prop-types";
import Button from "../layout/Button";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
function Delete({
  isOpen,
  onClose,
  onConfirm,
  action="Delete",
  itemName = "",
  isDelete = true,  
  className = "w-full max-w-md",
}) {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <p className="mb-6">
        { isDelete &&  t("confirm_delete")   }  {`   ${itemName}  `}
      </p>
      <div className="flex justify-end gap-2">
        <Button className="p-1 bg-rose-500 hover:bg-rose-600 text-white" type="button" variant="danger" onClick={onConfirm}>
          {action}
        </Button>
        <Button type="button"  onClick={onClose}>
          {t("no")}
        </Button>
      </div>
    </Modal>
  );
}

Delete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  action: PropTypes.string,
  itemName: PropTypes.string,
  isDelete: PropTypes.bool,
  className: PropTypes.string,
};

export default Delete;
