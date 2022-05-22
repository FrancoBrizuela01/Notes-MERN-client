import {
  ADD_NOTE,
  GET_NOTES,
  VALIDATE_FORM,
  DELETE_NOTE,
  CURRENT_NOTE,
  UPDATE_NOTE,
  ARCHIVE_NOTE,
  NOTE_ERROR,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        errorform: false,
      };
    case VALIDATE_FORM:
      return {
        ...state,
        errorform: true,
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case CURRENT_NOTE:
      return {
        ...state,
        selectednote: action.payload,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
        selectednote: null,
      };
    case ARCHIVE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id
            ? { ...note, archived: !note.archived }
            : note
        ),
      };
    case NOTE_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
