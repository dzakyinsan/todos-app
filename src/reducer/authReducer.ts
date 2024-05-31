import { TAuthAction, TAuthState } from "../types/auth";

export const initialState: TAuthState = {
  isAuthenticated: false,
  user: null,
};

export const reducer = (state: TAuthState, action: TAuthAction): any => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "GOOGLE_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user?.email,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error();
  }
};
