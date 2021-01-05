import { storyActionTypes as actionTypes } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

import * as api from "../api";

export const getStories = () => async dispatch => {
  try {
    const { data: stories } = await api.getStories();
    const action = { type: actionTypes.GET_STORIES, payload: { stories } };
    dispatch(action);
  } catch (error) {
    const { data, status } = await error.response;
    dispatch(returnErrors(data, status));
  }
};

export const addStory = newStory => async (dispatch, getState) => {
  try {
    const config = tokenConfig(getState);
    const userId = getState().auth.user._id;
    newStory.userId = userId;
    const {
      data: { storyAdded },
    } = await api.addStory(newStory, config);

    const action = {
      type: actionTypes.ADD_STORY,
      payload: { story: storyAdded },
    };
    dispatch(action);
  } catch (error) {
    const { response } = await error.response;
    dispatch(returnErrors(response.data, response.status));
  }
};

export const deleteStory = _id => async (dispatch, getState) => {
  try {
    const config = tokenConfig(getState);
    await api.deleteStory(_id, config);
    const action = {
      type: actionTypes.DELETE_STORY,
      payload: { _id },
    };
    dispatch(action);
  } catch (error) {
    const { data, status } = await error.response;
    dispatch(returnErrors(data, status));
  }
};

export const updateStory = (id, newStory) => async (dispatch, getState) => {
  try {
    const config = tokenConfig(getState);
    const userId = getState().auth.user._id;
    newStory.userId = userId;

    await api.updateStory(id, newStory, config);
    const action = {
      type: actionTypes.UPDATE_STORY,
      payload: { story: newStory },
    };
    dispatch(action);
  } catch (error) {
    const { data, status } = await error.response;
    dispatch(returnErrors(data, status));
  }
};
