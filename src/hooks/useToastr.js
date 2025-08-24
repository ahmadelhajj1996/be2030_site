import { toast } from "react-toastify";

const useToastr = () => {
  const toastr = (msg, type = "default") => {
    const options = {
      closeButton: false,
      className: "p-2 w-[400px] bg-white",
      autoClose: 2000,
    };

    switch (type) {
      case "success":
        toast.success(msg, options);
        break;
      case "error":
        toast.error(msg, options);
        break;
      case "info":
        toast.info(msg, options);
        break;
      case "warning":
        toast.warning(msg, options);
        break;
      default:
        toast(msg, options);
        break;
    }
  };

  return toastr;
};

export default useToastr;


// const toastr = useToastr();
// toastr("Something went wrong!", "error");
