import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragSquare from './dragSquare'
import DropSquare from './dropSquare'
import './index.less'

const CARD_INIT_ARR = [
  { id: 1, text: 'Apple', bg: 'red' },
  { id: 2, text: 'Banana', bg: 'yellow' },
  { id: 3, text: 'Orange', bg: 'orange' },
  { id: 4, text: 'Grape', bg: 'purple' },
  { id: 5, text: 'Watermelon', bg: 'green' },
  { id: 6, text: 'Peach', bg: 'pink' },
]

class CardSort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dragCardList: CARD_INIT_ARR,
      dropCardList: [],
    }
    this.updateDragAndDrop = this.updateDragAndDrop.bind(this)
  }

  updateDragAndDrop(newCardList) {
    this.setState({ dropCardList: newCardList })
  }

  render() {
    const { dragCardList, dropCardList } = this.state
    return (
      <DndProvider backend={HTML5Backend}>
        <div className='scard-move-container'>
          <h2>列表排序(数量无限，有顺移)</h2>
          <DropSquare
            dragCardList={dragCardList}
            dropCardList={dropCardList}
            updateDragAndDrop={this.updateDragAndDrop}
          />
          <DragSquare
            dropCardList={dropCardList}
            dragCardList={dragCardList}
            updateDragAndDrop={this.updateDragAndDrop}
          />
        </div>
      </DndProvider>
    )
  }
}

export default CardSort
