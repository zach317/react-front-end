import React from 'react'
import Box from './box'

export default function DragSquare({
  dragCardList,
  dropCardList,
  updateDragAndDrop,
}) {
  return (
    <div className='card_drag_group'>
      {dragCardList.map((each, index) => (
        <Box
          index={index}
          {...each}
          key={'drag_card' + index}
          dropCardList={dropCardList}
          updateDragAndDrop={updateDragAndDrop}
        />
      ))}
    </div>
  )
}
