import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import  reducers  from './../js/reducers/index';
import { createStore } from 'redux';
import React from 'react';

export const renderRouter = (ui, 
  { 
    route = '/', 
    history = createMemoryHistory({ initialEntries : [route] }), 
    ...options}
  ) => {
    return ({
      ...render(<Router history={ history }>{ui}</Router>, options),
      history  
    }  
  );
};

export const renderRedux = (ui, 
  {
    initialState, 
    store = createStore(reducers, initialState), 
    ...options
  } = {}
  ) => {
  return render(
    <Provider store={store}>
       {ui}
    </Provider>, options)
}

export const renderAll = (ui, {
  initialState, 
  route = '/', 
  ...options
} = {}
) => {
const history = createMemoryHistory({ initialEntries : [route], initialIndex : 0 });
const store = createStore(reducers, initialState);
return {
  ...render(
    <Provider store={store}>
      <Router history={history}>
       {ui}
       </Router>
    </Provider>, options),
    history
}
}