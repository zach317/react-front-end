/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Dropdown, Avatar, Modal, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
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
      key: 'user-profile',
      label: <a onClick={() => navigate('/user-profile')}>个人中心</a>,
    },
    {
      key: 'account-manage',
      label: <a onClick={() => navigate('/account-manage')}>账号管理</a>,
    },
    {
      key: 'logout',
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
            {user.avatar && (
              <Avatar
                size={35}
                icon={<UserOutlined />}
                src={`${user.avatar}`}
              />
            )}
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
