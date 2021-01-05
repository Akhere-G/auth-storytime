import { errorTypes } from "./types";

//return errors

export const returnErrors = (msg, status, id = null) => {
  return {
    type: errorTypes.GET_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: errorTypes.CLEAR_ERRORS,
  };
};
