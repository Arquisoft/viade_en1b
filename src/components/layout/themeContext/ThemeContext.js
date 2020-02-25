import {createContext} from 'react'

export const themes = {
    green: {
      "--color-secondary": 'white',
      "--color-primary": '#008080'
    },
    red: {
      "--color-secondary": 'white',
      "--color-primary": '#E85165'
    },
    
    purple: {
      "--color-secondary": 'white',
      "--color-primary": '#A875FF'
    },
    yellow: {
      "--color-secondary": 'black',
      "--color-primary": "#FFEE5E"
    },
    pink: {
      "--color-secondary": 'black',
      "--color-primary": "#FF65C7"
    },
    lightBlue: {
      "--color-secondary": 'black',
      "--color-primary": '#82A2FF'
    },
    lightGreen: {
      "--color-secondary" : 'black',
      "--color-primary" : '#BDF600'
    },
    lightOrange: {
      "--color-secondary" : 'white',
      '--color-primary': '#FF8E54'
    }
  }
  
  export const ThemeContext = createContext(themes.lightOrange);