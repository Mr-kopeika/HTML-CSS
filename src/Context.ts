import {createContext} from 'react'


interface IAppContext {
  login: boolean,
  loginTime?: Date,
  setLogin?: (b: boolean) => void,

  title: string,
  setTitle?: (s: string) => void,

  isClose: boolean,
  setClose?: (b: boolean) => void,

  history: string[]
}

const value = {
  login: false,
  title: '',
  isClose: false,
  history: []
}

export const AppContext = createContext<IAppContext>(value);