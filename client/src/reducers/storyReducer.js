import { storyActionTypes as actionTypes } from "../actions/types";

const initialStories = [];

const reducer = (state = initialStories, action) => {
  switch (action.type) {
    case actionTypes.GET_STORIES:
      return [...action.payload.stories];
    case actionTypes.ADD_STORY:
      const newStories = [{ ...action.payload.story }];
      newStories.push(...state);
      return newStories;
    case actionTypes.DELETE_STORY:
      return state.filter(story => story._id !== action.payload._id);
    case actionTypes.UPDATE_STORY:
      return state.map(story =>
        story._id !== action.payload.story._id
          ? story
          : { ...action.payload.story }
      );
    default:
      return state;
  }
};

export default reducer;
