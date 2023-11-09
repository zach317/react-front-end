import React from 'react'
import './index.less'
import { useDrag, useDrop } from 'react-dnd'
import deploy from './deploy'
import designComponents from './components'

const DesignSystem = () => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'BOX',
    // 数据
    item: {
      type: '111',
      index: 1,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop(item, monitor) {
      console.log('🚀 ~ file: Bucket.tsx:8 ~ drop ~ item:', item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const handleRenderComponents = () =>
    deploy.map((item) => {
      const El = designComponents[item.element]
      return (
        <div ref={drag}>
          <El />
        </div>
      )
    })
  return (
    <div className='design-system-wrap'>
      <div className='system-design-component'>{handleRenderComponents()}</div>
      <div className='design-main'>
        <div style={{ width: '100%' }} ref={drop}>
          {canDrop ? '放这里' : '拖起来'}
        </div>
      </div>
    </div>
  )
}

export default DesignSystem
