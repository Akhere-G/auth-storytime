import { formActionTypes as actionTypes } from "../actions/types";

const initialStories = {
  currentStory: null,

  mode: actionTypes.ADD_MODE,
};

const reducer = (state = initialStories, action) => {
  switch (action.type) {
    case actionTypes.ADD_MODE:
      return {
        currentStory: null,
        mode: actionTypes.ADD_MODE,
      };
    case actionTypes.EDIT_MODE:
      return {
        currentStory: { ...action.payload.storyData, _id: action.payload._id },
        mode: actionTypes.EDIT_MODE,
      };
    default:
      return state;
  }
};

export default reducer;
