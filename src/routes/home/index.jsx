import React from 'react'
import { useNavigate } from 'react-router-dom'
import CarouselBanner from './carousel-banner'

import './index.less'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='home-wrap'>
      <CarouselBanner />
    </div>
  )
}

export default Home
