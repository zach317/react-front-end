import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { message } from 'antd'
import crypto from '@/utils/crypto'
import Header from '../header'
import { getUserinfo } from './services'
import { setI18n, t } from '@/utils/i18n'
import './index.less'
import zh from '../../../i18n/zh.json'
import ja from '../../../i18n/ja.json'
import en from '../../../i18n/en.json'
// ... 其他更多语言

const layout = () => {
  const id = localStorage.getItem('userId')
  const userId = id && crypto.decrypt(id)
  const [user, setUser] = useState({})
  const [lang, setLang] = useState('zh')
  console.log('🚀  layout  lang:', lang)
  setI18n({
    locale: lang,
    langs: {
      zh,
      ja,
      en,
      // ... 其他更多语言
    },
  })

  const handleChangeLang = (lan) => {
    setLang(lan)
  }
  const getUserinfoFunc = async () => {
    try {
      const res = await getUserinfo()
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
      <Header handleChangeLang={handleChangeLang} user={user} />
      <div className='main-wrap'>
        <Outlet context={{ user, getUserinfoFunc, setLang }} />
      </div>
    </div>
  )
}

export default layout
