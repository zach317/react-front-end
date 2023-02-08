import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header'

const layout = (props) => {
  console.log('🚀  layout  props', props)
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default layout
