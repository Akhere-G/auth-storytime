import { formActionTypes as actionTypes } from "./types";

export const switchToEditMode = (_id, storyData) => {
  return {
    type: actionTypes.EDIT_MODE,
    payload: { ...storyData, _id },
  };
};

export const switchToAddMode = () => {
  return {
    type: actionTypes.ADD_MODE,
  };
};
