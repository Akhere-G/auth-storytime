import { authTypes } from "./types";
import { returnErrors } from "./errorActions";
import * as api from "../api";

//check token and load user

export const loadUser = () => async (dispatch, getState) => {
  //user loading
  dispatch({ type: authTypes.USER_LOADING });

  //get token from local state

  try {
    const { data } = await api.authUser(tokenConfig(getState));
    dispatch({ type: authTypes.USER_LOADED, payload: data });
  } catch (err) {
    const response = await err.response;
    dispatch(returnErrors(response.data.msg, response.status));
    dispatch({ type: authTypes.AUTH_ERROR });
  }
};

//Register User
export const registerUser = ({ name, email, password }) => async dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.addUser(body, config);
    dispatch({ type: authTypes.REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: authTypes.REGISTER_FAIL });
    const response = await err.response;

    dispatch(
      returnErrors(response.data.msg, response.status, authTypes.REGISTER_FAIL)
    );
  }
};

export const logout = () => {
  const action = { type: authTypes.LOGOUT_SUCCESS };
  return action;
};

export const login = ({ email, password }) => async dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ email, password });

  try {
    const res = await api.login(body, config);
    dispatch({ type: authTypes.LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: authTypes.LOGIN_FAIL });
    const response = await err.response;

    dispatch(
      returnErrors(response.data.msg, response.status, authTypes.LOGIN_FAIL)
    );
  }
};

///setup config/header and token

export const tokenConfig = getState => {
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
