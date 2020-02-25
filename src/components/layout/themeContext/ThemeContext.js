import {createContext} from 'react'

export const themes = {
    green: {
      "--color-secondary": 'white',
      "--color-primary": '#008080'
    },
    purple: {
      "--color-secondary": 'white',
      "--color-primary": '#A875FF'
    },
    lightBlue: {
      "--color-secondary": 'black',
      "--color-primary": '#38F9FF'
    },
    lightGreen: {
      "--color-secondary" : 'black',
      "--color-primary" : '#BDF600'
    },
    lightOrange: {
      "--color-secondary" : 'white',
      '--color-primary': '#E8684D'
    }
  }
  
  export const ThemeContext = createContext(themes.lightOrange);