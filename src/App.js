import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import MyNavBar from "./components/layout/navbar/NavBar";
import MyProfile from "./components/user/myProfile/MyProfile";
import Login from "./components/layout/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeContext } from './components/layout/themeContext/ThemeContext'

import { useLoggedIn } from "@solid/react";

const App = (props) => {

  const theme = useContext(ThemeContext)
  useEffect(() => {
    Object.keys(theme).map(key => {
      const value = theme[key]
      return document.documentElement.style.setProperty(key, value)
      
    })
    return
  })
  
  const navBar = useLoggedIn() === true ? <MyNavBar brandName="Viade_en1b"></MyNavBar> : null

  return (
      <BrowserRouter>
        <div className="App">
          {navBar}
          <Switch>
            <Route exact path="/" render={props => <Login {...props} />}></Route>
            <Route path="/profile" render={() => <MyProfile {...props}/>}></Route>
            <Route exact path="/dashboard" render={() => <Dashboard {...props} />}></Route>
          </Switch>
        </div>
      </BrowserRouter>

  );
}

export default (App)