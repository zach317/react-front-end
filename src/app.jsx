import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/home'
import UserLayout from './routes/user/layout'
import Register from './routes/user/register'
import Login from './routes/user/login'
import './index.less'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user' element={<UserLayout />}>
        <Route index path='/user/register' element={<Register />} />
        <Route index path='/user/login' element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
