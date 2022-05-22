import { SHOW_ALERT, HIDE_ALERT } from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        alert: action.payload,
      };
    case HIDE_ALERT:
      return {
        alert: null,
      };
    default:
      return state;
  }
};
