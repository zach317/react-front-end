import React from 'react'
import { useNavigate } from 'react-router-dom'
import { whiteLogo as logo } from '@/utils/imgs'
import UserAvatar from './user-avatar'
import './index.less'

const Header = (props) => {
  const navigate = useNavigate()
  const { user } = props || {}
  return (
    <div className='header-wrap'>
      <div onClick={() => navigate('/')} className='header-logo'>
        <img alt='logo' src={logo} />
      </div>
      <div className='header-category'>中间放类目</div>
      <UserAvatar user={user} />
    </div>
  )
}

export default Header
