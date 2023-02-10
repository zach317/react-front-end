/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Dropdown, Avatar, Modal, message } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import crypto from '../../../utils/crypto'
import './index.less'

const UserAvatar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    Modal.confirm({
      title: '确定要退出登录吗',
      onOk: () => {
        localStorage.clear()
        message.success('退出成功')
        navigate('/user/login')
      },
    })
  }
  const items = [
    // {
    //   key: '1',
    //   label: <a>个人中心</a>,
    // },
    {
      key: '2',
      label: <a onClick={handleLogout}>退出登录</a>,
    },
  ]
  const user = localStorage.getItem('user')
  const userInfo = user && crypto.decrypt(user)
  const { nickname } = userInfo || {}
  return (
    <div className='user-avatar'>
      {nickname ? (
        <Dropdown menu={{ items }}>
          <div className='avatar-wrap' onClick={(e) => e.preventDefault()}>
            <span>{nickname}</span>
            <Avatar size={55} icon={<UserOutlined />} />
            <DownOutlined />
          </div>
        </Dropdown>
      ) : (
        <Link className='link-to-login' to='/user/login'>
          登陆 / 注册
        </Link>
      )}
    </div>
  )
}

export default UserAvatar
