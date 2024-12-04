// Path: src/thunks/loadSlicesHelpers.js
import { toast } from 'react-toastify';

export const createLoadingToast = (message) => {
  const toastId = toast.info(message, { autoClose: false });
  const intervalId = setInterval(() => {
    toast.update(toastId, { render: `${message}...`, autoClose: false });
  }, 2000);
  return { toastId, intervalId };
};

export const dismissLoadingToast = (toastId, intervalId, successMessage) => {
  clearInterval(intervalId);
  toast.dismiss(toastId);
  toast.success(successMessage);
};

export const handleLoadingError = (toastId, intervalId, errorMessage, error) => {
  clearInterval(intervalId);
  toast.dismiss(toastId);
  toast.error(errorMessage);
  console.error(errorMessage, error);
};
