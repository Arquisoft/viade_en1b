import React, {useState, useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import MyNavBar from "./components/Layout/NavBar/NavBar";
import MyProfile from "./components/user/profile/MyProfile";
import Login from "./components/Layout/login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { ThemeContext } from './components/Layout/themeContext/ThemeContext'

const App = (props) => {

  const theme = useContext(ThemeContext)
  const [userLoggedIn] = useState(true)
  useEffect(() => {
    Object.keys(theme).map(key => {
      const value = theme[key]
      return document.documentElement.style.setProperty(key, value)
      
    })
    return
  })
  const navBar = userLoggedIn ? (
    <MyNavBar brandName="Viade_en1b"></MyNavBar>
  ) : null;

  return (
      <BrowserRouter>
        <div className="App">
          {navBar}

          <Switch>
            <Route
              exact
              path="/"
              render={props => <Login {...props} />}
            ></Route>
            <Route path="/profile" component={MyProfile}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>

  );
}

export default App;