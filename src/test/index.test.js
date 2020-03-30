
  import App from "../index.js";
  import React from "react";
  import { Provider } from 'react-redux';
  import {ThemeContext, themes} from "../components/layout/themeContext/ThemeContext"
  import ReactDOM from 'react-dom';
  import {store} from "../createStore";
  

  jest.mock('react-dom', ()=> ({render: jest.fn()}))
  const myStore = store;  
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <ThemeContext.Provider data-testid="provider" value={themes.purple}>
    <Provider store={myStore}><App/></Provider>
    </ThemeContext.Provider>, div);
  });
  