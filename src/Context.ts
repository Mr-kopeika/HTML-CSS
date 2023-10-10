import {createContext} from 'react'

export type Course = {
  title: string,
  description: string,
  type: string
}

interface IAppContext {
  login: boolean,
  loginTime?: Date,
  setLogin?: (b: boolean) => void,

  title: string,
  setTitle?: (s: string) => void,

  isClose: boolean,
  setClose?: (b: boolean) => void,

  history: string[],

  courses: Course[],
  addCourse?: (c: Course) => void,
}

const value = {
  login: false,
  title: '',
  isClose: false,
  history: [],
  courses: []
}

export const AppContext = createContext<IAppContext>(value);