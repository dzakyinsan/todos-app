import { TAuthAction, TAuthState } from "../types/auth";

export const initialState: TAuthState = {
  isAuthenticated: false,
  email: null,
};

export const reducer = (state: TAuthState, action: TAuthAction): any => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload,
      };
    case "GOOGLE_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        email: action.payload.email,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        email: null,
      };
    default:
      throw new Error();
  }
};
