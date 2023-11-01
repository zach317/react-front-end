/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Dropdown, Avatar, Modal, message } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import './index.less'

const UserAvatar = (props) => {
  const { user } = props || {}
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
    {
      key: '1',
      label: <a onClick={() => navigate('/user-profile')}>个人中心</a>,
    },
    {
      key: '2',
      label: <a onClick={handleLogout}>退出登录</a>,
    },
  ]

  const { nickname } = user || {}
  return (
    <div className='user-avatar'>
      {nickname ? (
        <Dropdown menu={{ items }}>
          <div className='avatar-wrap' onClick={(e) => e.preventDefault()}>
            <span className='avatar-nickname'>{nickname}</span>
            <Avatar size={45} icon={<UserOutlined />} src={`${user.avatar}`} />
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
