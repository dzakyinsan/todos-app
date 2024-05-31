import { useEffect, useReducer } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";

import AuthContext from "./context/authContext";
import { initialState, reducer } from "./reducer/authReducer";
import routes from "./routes";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const users = localStorage.getItem("users");
    const user = localStorage.getItem("user");

    !users && localStorage.setItem("users", JSON.stringify([]));
    !user && localStorage.setItem("user", "");
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>{renderRoutes(routes())}</BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
