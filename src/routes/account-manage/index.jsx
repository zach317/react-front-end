import React, { useState, useEffect } from 'react'
import { getUserAccountInfo } from './services'
import { Modal } from 'antd'
import AccountInfoItem from './account-info-item'
import PhoneSetting from './phone-setting'
import './index.less'

const AccountManage = () => {
  const [{ phone, email }, setAccountInfo] = useState({})
  const getAccountInfo = async () => {
    try {
      const res = await getUserAccountInfo()
      setAccountInfo(res.data)
    } catch (error) {
      console.log('🚀  getAccountInfo  error:', error)
    }
  }

  useEffect(() => {
    getAccountInfo()
  }, [])

  const handleChangePhone = () => {
    const modal = Modal.confirm()
    modal.update({
      title: '手机号',
      content: (
        <PhoneSetting getInfo={getAccountInfo} phone={phone} modal={modal} />
      ),
      icon: null,
      footer: null,
    })
  }
  return (
    <div className='account-manage-wrap'>
      <div className='account-bind'>
        <h4>账户绑定</h4>
        <AccountInfoItem
          title='手机号'
          data={phone}
          onClick={handleChangePhone}
        />
        <AccountInfoItem title='邮箱' data={email} />
        <AccountInfoItem title='密码' data='已设置，可通过账户密码登录' />
      </div>
    </div>
  )
}

export default AccountManage
