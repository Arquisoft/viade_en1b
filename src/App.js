import React, { useEffect, useState } from "react";
import "./App.css";
import MyNavBar from "./components/layout/navbar/NavBar";
import {
  ThemeContext,
  themes,
} from "./components/layout/themeContext/ThemeContext";
import { useLoggedIn } from "@solid/react";
import Routing from "./components/routing/Routing";
import Footer from "./components/layout/footer/Footer";

export const App = (props) => {
  const [theme, changeTheme] = useState(themes.purple);

  useEffect(() => {
    Object.keys(theme).map((key) => {
      const value = theme[key];
      return document.documentElement.style.setProperty(key, value);
    });
    return;
  });

  const navBar =
    useLoggedIn() === true ? (
      <MyNavBar data-testid="theNavBar" brandName="Viade_en1b"></MyNavBar>
    ) : null;

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div data-testid="theApp" className="App">
        <Routing navBar={navBar} />
        <Footer></Footer>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
