import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Page, Login, CreateCourse, Profile, Statistics, Settings } from '.'
import './index.scss';
import { AppContext } from './Context';


const value = {
  login: false,
  title: '',
  isClose: false,
  history: []
}

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BrowserRouter>
      <AppContext.Provider value={value}>
        <Routes>

          <Route path='' element={<Navigate to='/login' />}></Route>

          <Route path='/login' element={<Login />} />

          <Route path='/page' element={<Page />}>

            <Route path='create-course' element={<CreateCourse />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='statistics' element={<Statistics />}></Route>
            <Route path='settings' element={<Settings />}></Route>
          </Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
