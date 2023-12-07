import React from 'react'
import { useNavigate } from 'react-router-dom'
import { whiteLogo as logo } from '@/utils/imgs'
import UserAvatar from './user-avatar'
import './index.less'
import { Button } from 'antd'

const Header = (props) => {
  const navigate = useNavigate()
  const { user, handleChangeLang } = props || {}

  return (
    <div className='header-wrap'>
      <div onClick={() => navigate('/')} className='header-logo'>
        <img alt='logo' src={logo} />
      </div>
      <div className='header-category'>
        <Button onClick={() => handleChangeLang('en')}>切换英文</Button>
        <Button onClick={() => handleChangeLang('ja')}>切换日语</Button>
      </div>
      <UserAvatar user={user} />
    </div>
  )
}

export default Header
