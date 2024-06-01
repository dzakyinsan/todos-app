import { TTodoState } from "../types/todo";

export const initialState: TTodoState = {
  data: null,
  dataChecked: null,
};

export const reducer = (state: TTodoState, action: any): any => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        data: action.payload.dataUnchecked,
        dataChecked: action.payload.dataChecked,
      };
    case "EDIT_TODO":
    case "DELETE_TODO":
    case "ADD_SUB_TODO":
    case "DELETE_SUB_TODO":
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        data: [...state.data!, action.payload],
      };
    default:
      throw new Error();
  }
};
