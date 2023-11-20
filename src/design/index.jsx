import React, { useState, useEffect } from 'react'
import './index.less'
import { useDrag, useDrop } from 'react-dnd'
import deploy from './deploy'
import DropSquare from './drop-square'
import DragCard from './drag-card'

const DesignSystem = () => {
  const [elList, setElList] = useState([])

  const updateDropList = (newList) => setElList(newList)

  const handleRenderComponents = () =>
    deploy.map((item, index) => (
      <DragCard
        updateDropList={updateDropList}
        key={item.element}
        index={index}
        data={item}
        dropLists={elList}
      />
    ))

  return (
    <div className='design-system-wrap'>
      <div className='system-design-component'>{handleRenderComponents()}</div>
      <DropSquare dropLists={elList} updateDropList={updateDropList} />
    </div>
  )
}

export default DesignSystem
