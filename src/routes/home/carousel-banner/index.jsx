import React, { useRef } from 'react'
import { Carousel, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './index.less'

const CarouselBanner = () => {
  const carouselEL = useRef(null)
  return (
    <div className='carousel-wrap'>
      <Button
        className='arrow-btn left-btn'
        onClick={() => {
          carouselEL.current.prev()
        }}
        icon={<LeftOutlined />}
      />
      <Button
        className='arrow-btn right-btn'
        onClick={() => {
          carouselEL.current.next()
        }}
        icon={<RightOutlined />}
      />
      <Carousel ref={carouselEL} arrows effect='fade' autoplay>
        <div>
          <h3 className='carousel-content'>1</h3>
        </div>
        <div>
          <h3 className='carousel-content'>2</h3>
        </div>
        <div>
          <h3 className='carousel-content'>3</h3>
        </div>
        <div>
          <h3 className='carousel-content'>4</h3>
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselBanner
