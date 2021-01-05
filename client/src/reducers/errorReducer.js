import { errorTypes } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case errorTypes.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case errorTypes.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };

    default:
      return state;
  }
};

export default reducer;
