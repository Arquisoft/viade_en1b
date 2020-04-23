import { createContext } from "react";

export const themes = {
  green: {
    "--color-secondary": "white",
    "--color-primary": "#008080",
    name: "Green",
  },
  dark: {
    "--color-secondary": "#CCCCCC",
    "--color-primary": "#202020",
    "--color-tertiary": "white",
    name: "Dark",
  },

  red: {
    "--color-secondary": "white",
    "--color-primary": "#E85165",
    "--color-tertiary": "white",
    name: "Red",
  },

  purple: {
    "--color-secondary": "white",
    "--color-primary": "#A875FF",
    "--color-tertiary": "white",
    name: "Purple",
  },
  yellow: {
    "--color-secondary": "black",
    "--color-primary": "#FFEE5E",
    "--color-tertiary": "black",
    name: "Yellow",
  },
  pink: {
    "--color-secondary": "black",
    "--color-primary": "#FF65C7",
    "--color-tertiary": "black",
    name: "Pink",
  },
  lightBlue: {
    "--color-secondary": "black",
    "--color-primary": "#82A2FF",
    "--color-tertiary": "black",
    name: "Light Blue",
  },
  lightGreen: {
    "--color-secondary": "black",
    "--color-primary": "#BDF600",
    "--color-tertiary": "black",
    name: "Light Green",
  },
  lightOrange: {
    "--color-secondary": "white",
    "--color-primary": "#FF8E54",
    "--color-tertiary": "white",
    name: "Ligh Orange",
  },
  deuteranopia: {
    "--color-secondary": "#1A1A1A",
    "--color-primary": "#FFFC61",
    "--color-tertiary": "#1A1A1A",
    name: "Deuteranopia",
  },
  protanopia: {
    "--color-secondary": "#022397",
    "--color-primary": "#FFFC61",
    "--color-tertiary": "#022397",
    name: "Protanopia",
  },
  tritanopia: {
    "--color-secondary": "#FFEBF0",
    "--color-primary": "#91012D",
    "--color-tertiary": "#FFEBF0",
    name: "Tritanopia",
  },
};

export const ThemeContext = createContext({
  theme: themes.lightOrange,
  setTheme: (theme) => {},
});
