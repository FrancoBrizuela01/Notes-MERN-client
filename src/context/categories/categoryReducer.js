import { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY } from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
