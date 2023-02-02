import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.less'

const UserLayout = () => {
  return (
    <div className='user-layout-wrap'>
      <div className='form-wrap'>
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
