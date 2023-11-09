import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/home'
import UserLayout from './routes/user/layout'
import Register from './routes/user/register'
import Login from './routes/user/login'
import Layout from './common/layout'
import UserProfile from './routes/user-profile'
import AccountManage from './routes/account-manage'
import DesignSystem from './design'
import './index.less'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/account-manage' element={<AccountManage />} />
      </Route>
      <Route path='/user' element={<UserLayout />}>
        <Route path='/user/register' element={<Register />} />
        <Route path='/user/login' element={<Login />} />
      </Route>
      <Route path='/design-system' element={<DesignSystem />} />
    </Routes>
  </BrowserRouter>
)

export default App
