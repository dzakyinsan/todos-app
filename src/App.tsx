import {useReducer} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


import routes from './routes';
import { reducer } from './reducer/mainReducer';
import MainContext, { initialState } from './context/mainContext';

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState)  

  const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache(),
  });

  return(
    <ApolloProvider client={client}>
      <MainContext.Provider value={{store, dispatch }}>
        <BrowserRouter>
          {renderRoutes(routes())}
        </BrowserRouter>
      </MainContext.Provider>
    </ApolloProvider>
)
}

export default App;
