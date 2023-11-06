import React from 'react'
import { Button } from 'antd'
import './index.less'

const AccountInfoItem = ({ data, title, onClick = () => {} }) => {
  console.log('🚀  AccountInfoItem  data:', data)
  return (
    <div className='account-info-item-wrap'>
      {data ? (
        <i className='iconfont item-icon item-icon-success'>&#xe62f;</i>
      ) : (
        <i className='iconfont item-icon item-icon-warn'>&#xe605;</i>
      )}
      <div className='item-left'>
        <div className='left left-title'>{title}</div>
        <div className='left left-data'>{data || `未绑定，请绑${title}`}</div>
      </div>
      <Button onClick={onClick} className='item-btn' size='small'>
        编辑
      </Button>
    </div>
  )
}

export default AccountInfoItem
