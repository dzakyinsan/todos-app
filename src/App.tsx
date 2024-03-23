import { useMemo, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import routes from "./routes";
import { mainReducer, initialState } from "./reducer/mainReducer";
import MainContext from "./context/mainContext";

const App = () => {
  const client = new ApolloClient({
    uri: "https://beta.pokeapi.co/graphql/v1beta",
    cache: new InMemoryCache(),
  });

  const [state, dispatch] = useReducer(mainReducer, initialState);
  const mainContext = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ApolloProvider client={client}>
      <MainContext.Provider value={mainContext}>
        <BrowserRouter>{renderRoutes(routes())}</BrowserRouter>
      </MainContext.Provider>
    </ApolloProvider>
  );
};

export default App;
