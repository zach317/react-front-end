import React from 'react'
import './index.less'
import UserAvatar from './user-avatar'

const Header = () => (
  <div className='header-wrap'>
    <div className='header-logo'>这里放logo</div>
    <div className='header-category'>中间放类目</div>
    <UserAvatar />
  </div>
)

export default Header
