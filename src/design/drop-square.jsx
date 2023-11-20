/* eslint-disable react/no-array-index-key */
import React, { useCallback, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import DropCard from './drop-card'
import update from 'immutability-helper'

const DropSquare = ({ dropLists = [], updateDropList }) => {
  console.log('🚀  DropSquare  dropLists:', dropLists)
  const [{ canDrop }, drop] = useDrop({
    accept: 'card',
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
    }),
  })

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      console.log('dragIndex', dragIndex, 'hoverIndex', hoverIndex)

      /**
       * 1、如果此时拖拽的组件是 Box 组件，则 dragIndex 为 undefined，则此时修改，则此时修改 cardList 中的占位元素的位置即可
       * 2、如果此时拖拽的组件是 Card 组件，则 dragIndex 不为 undefined，此时替换 dragIndex 和 hoverIndex 位置的元素即可
       */
      if (dragIndex === undefined) {
        const lessIndex = dropLists.findIndex((item) => item.id === -1)
        updateDropList(
          update(dropLists, {
            $splice: [
              [lessIndex, 1],
              [hoverIndex, 0, { empty: true }],
            ],
          })
        )
      } else {
        const dragCard = dropLists[dragIndex]
        updateDropList(
          update(dropLists, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        )
      }
      // eslint-disable-next-line
    },
    [dropLists, updateDropList]
  )
  return (
    <div className='design-main' ref={drop}>
      {dropLists.map((item, index) => (
        <DropCard moveCard={moveCard} item={item} index={index} key={index} />
      ))}
    </div>
  )
}

export default DropSquare
