import { toast } from "react-toastify";
import { Slide } from "react-toastify";

export const showGlobalAlert = (message, type = "success", options = {}) => {
  toast.dismiss();

  const toastId = "single-toast-id";

  const defaultOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
    toastId,
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "info":
      toast.info(message, defaultOptions);
      break;
    case "warning":
      toast.warning(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
  }
};
