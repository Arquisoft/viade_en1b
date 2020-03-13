import React, { useEffect, useContext } from "react";
import "./App.css";
import MyNavBar from "./components/layout/navbar/NavBar";
import { ThemeContext } from './components/layout/themeContext/ThemeContext'
import { useLoggedIn } from "@solid/react";
import Routing from "./components/routing/Routing";

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
      <div className="App">
        <Routing navBar = {navBar}/>
      </div>

  );
}

export default (App)
