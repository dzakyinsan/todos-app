import { TTodoState } from "../types/todo";

export const initialState: TTodoState = {
  data: null,
};

export const reducer = (state: TTodoState, action: any): any => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        data: [...state.data!, action.payload],
      };
    case "EDIT_TODO":
      return {
        ...state,
        data: action.payload,
      };
    case "DELETE_TODO":
      return {
        ...state,
        data: action.paylaod,
      };
    default:
      throw new Error();
  }
};
