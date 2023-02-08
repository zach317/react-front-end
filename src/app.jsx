import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/home'
import UserLayout from './routes/user/layout'
import Register from './routes/user/register'
import Login from './routes/user/login'
import Layout from './common/layout'
import './index.less'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/user' element={<UserLayout />}>
        <Route path='/user/register' element={<Register />} />
        <Route path='/user/login' element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
