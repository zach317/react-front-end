/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Dropdown, Avatar } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import crypto from '../../../utils/crypto'
import './index.less'

const UserAvatar = () => {
  const items = [
    {
      key: '1',
      label: <a>退出登录</a>,
    },
  ]
  const user = crypto.decrypt(localStorage.getItem('user'))
  const { nickname } = user
  return (
    <div className='user-avatar'>
      <Dropdown menu={{ items }}>
        <div className='avatar-wrap' onClick={(e) => e.preventDefault()}>
          <span>{nickname}</span>
          <Avatar size={55} icon={<UserOutlined />} />
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default UserAvatar
