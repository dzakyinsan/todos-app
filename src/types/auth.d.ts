export type TUser = {
  email: string;
  password: string;
};

export type TAuthState = {
  isAuthenticated: boolean;
  user: TUser | null;
};

export type LoginAction = {
  type: "LOGIN";
  payload: TAuthState;
};

export type LogoutAction = {
  type: "LOGOUT";
};

export type GoogleLoginACtion = {
  type: "GOOGLE_LOGIN";
  payload: TAuthState;
};

export type InitializeAction = {
  type: "INITIALIZE";
  payload: TAuthState;
};

export type TAuthAction =
  | LoginAction
  | LogoutAction
  | InitializeAction
  | GoogleLoginACtion;
