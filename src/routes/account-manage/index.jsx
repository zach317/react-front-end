import React, { useState, useEffect } from 'react'
import { Modal, message } from 'antd'
import { getUserAccountInfo } from './services'
import AccountInfoItem from './account-info-item'
import BindSetting from './bind-setting'
import './index.less'

const AccountManage = () => {
  const [{ phone, email }, setAccountInfo] = useState({})
  const getAccountInfo = async () => {
    try {
      const res = await getUserAccountInfo()
      setAccountInfo(res.data)
    } catch (error) {
      message.warning(error.message)
    }
  }

  useEffect(() => {
    getAccountInfo()
  }, [])

  const handleChangeBind = (type) => {
    const titleObj = {
      phone: '手机号',
      email: '邮箱',
    }
    const bindDataObj = {
      phone,
      email,
    }
    const title = titleObj[type]
    const modal = Modal.confirm()
    modal.update({
      title,
      content: (
        <BindSetting
          getInfo={getAccountInfo}
          bindData={bindDataObj[type]}
          modal={modal}
          type={type}
          title={title}
        />
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
          onClick={() => handleChangeBind('phone')}
        />
        <AccountInfoItem
          title='邮箱'
          data={email}
          onClick={() => handleChangeBind('email')}
        />
        <AccountInfoItem title='密码' data='已设置，可通过账户密码登录' />
      </div>
    </div>
  )
}

export default AccountManage
