import React, { useEffect, useContext } from "react";
import "./App.css";
import MyNavBar from "./components/layout/navbar/NavBar";
import { ThemeContext } from "./components/layout/themeContext/ThemeContext";
import { useLoggedIn } from "@solid/react";
import Routing from "./components/routing/Routing";
import Footer from "./components/layout/footer/Footer";
import { IntlProvider } from "react-intl";
import { locales } from "./utils/locales";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const App = (props) => {
  const theme = useContext(ThemeContext);
  const {locale} = props;
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
    <IntlProvider
      key={locale}
      locale={locale}
      messages={locales[props.locale]}
    >
      <div data-testid="theApp" className="App">
        <Routing navBar={navBar} />
        <Footer></Footer>
      </div>
    </IntlProvider>
  );
};

App.protoTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = (state) => {
  return { locale: state.localeReducer.locale };
};

export default connect(mapStateToProps)(App);
