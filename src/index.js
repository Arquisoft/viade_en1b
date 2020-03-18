import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/RootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { ThemeContext, themes } from './components/layout/themeContext/ThemeContext'

const myLogger = store => next => action => {
    console.group(action.type)
    console.log('previous state', store.getState())
    next(action)
    console.log('actual state', store.getState())
    console.groupEnd()
}

const store = createStore(rootReducer,
  applyMiddleware(thunk, myLogger))
  

ReactDOM.render(
  <ThemeContext.Provider value={themes.purple}>
    <Provider store={store}><App/></Provider>
  </ThemeContext.Provider>
  ,
  document.getElementById('root')
);
