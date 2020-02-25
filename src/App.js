import React, {useState, useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import MyNavBar from "./components/layout/navbar/NavBar";
import MyProfile from "./components/user/myProfile/MyProfile";
import Login from "./components/layout/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeContext } from './components/layout/themeContext/ThemeContext'

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
  return (
      <BrowserRouter>
        <div className="App">
        <MyNavBar brandName="Viade_en1b"></MyNavBar>
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