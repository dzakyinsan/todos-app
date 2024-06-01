import { googleLogout } from "@react-oauth/google";
import { TUser } from "../types/auth";

export const loginAction = (dispatch: any, user: TUser) => {
  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find(
      (val: { email: string }) => val.email === user.email
    );

    if (existingUser) {
      if (existingUser.password === user.password) {
        localStorage.setItem("email", user.email);
        dispatch({
          type: "LOGIN",
          payload: {
            isAuthenticated: true,
            email: user.email,
            error: "",
          },
        });
        resolve("login success");
      } else {
        dispatch({
          type: "LOGIN",
          payload: {
            isAuthenticated: false,
            email: null,
            error: "invalid password",
          },
        });
        reject(new Error("invalid password"));
      }
    } else {
      users.push({
        email: user.email,
        password: user.password,
        todo: [],
      });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("email", user.email);
      dispatch({
        type: "LOGIN",
        payload: {
          isAuthenticated: true,
          email: user.email,
          error: "",
        },
      });
      resolve("login success");
    }
  });
};

export const googleLoginAction = (dispatch: any, user: string) => {
  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find(
      (val: { email: string }) => val.email === user
    );

    if (!existingUser) {
      users.push({
        email: user,
        todo: [],
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
    localStorage.setItem("email", user);

    dispatch({ type: "GOOGLE_LOGIN", payload: user });
    resolve("login success");
  });
};

export const logoutAction = (dispatch: any) => {
  googleLogout();
  localStorage.removeItem("email");
  dispatch({ type: "LOGOUT" });
};
