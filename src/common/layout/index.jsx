import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { message } from 'antd'
import crypto from '@/utils/crypto'
import Header from '../header'
import { getUserinfo } from './services'
import './index.less'

const layout = () => {
  const id = localStorage.getItem('userId')
  const userId = id && crypto.decrypt(id)
  const [user, setUser] = useState({})
  const getUserinfoFunc = async () => {
    try {
      const res = await getUserinfo({ userId })
      if (res?.success) {
        setUser(res.data)
      }
    } catch (error) {
      message.warning(error.message)
    }
  }
  useEffect(() => {
    if (userId) {
      getUserinfoFunc()
    }
  }, [userId])
  return (
    <div className='layout-wrap'>
      <Header user={user} />
      <div className='main-wrap'>
        <Outlet context={{ user, getUserinfoFunc }} />
      </div>
    </div>
  )
}

export default layout
