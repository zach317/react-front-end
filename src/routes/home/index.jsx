import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const goRegister = () => {
    navigate('/user/register')
  }
  return (
    <Button onClick={goRegister} type='primary'>
      去注册
    </Button>
  )
}

export default Home
