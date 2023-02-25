import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import { colorLogo } from '@/utils/imgs'

import './index.less'

const UserLayout = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div className='user-layout-wrap'>
      <Spin spinning={loading}>
        <div className='form-wrap'>
          <img alt='logo' className='form-logo' src={colorLogo} />
          <Outlet context={{ setLoading }} />
        </div>
      </Spin>
    </div>
  )
}

export default UserLayout
