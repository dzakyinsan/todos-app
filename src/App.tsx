import {useReducer} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
import { reducer } from './reducer/mainReducer';
import MainContext, { initialState } from './context/mainContext';

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState)  
  return(
    <MainContext.Provider value={{store, dispatch }}>
      <BrowserRouter>
        {renderRoutes(routes())}
      </BrowserRouter>
    </MainContext.Provider>
)
}

export default App;
