import React from 'react'
import { Skeleton } from 'antd'
import { DotChartOutlined } from '@ant-design/icons'
import { useDrag } from 'react-dnd'
import './index.less'

const DragCard = ({ data, updateDropList, dropLists }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item() {
      //在拖动操作开始时触发
      const useless = dropLists.find((item) => item.empty)
      // 拖拽开始时，向 cardList 数据源中插入一个占位的元素，如果占位元素已经存在，不再重复插入
      if (!useless) {
        updateDropList([{ empty: true }, ...dropLists])
      }

      return data
    },
    end: (_, monitor) => {
      const uselessIndex = dropLists.findIndex((item) => item.empty)

      /**
       * 拖拽结束时，判断是否将拖拽元素放入了目标接收组件中
       *  1、如果是，则使用真正传入的 box 元素代替占位元素
       *  2、如果否，则将占位元素删除
       */

      if (monitor.didDrop()) {
        dropLists.splice(uselessIndex, 1, { ...monitor.getItem() })
      } else {
        dropLists.splice(uselessIndex, 1)
      }
      // 更新 cardList 数据源
      updateDropList(dropLists)
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  return (
    <div ref={drag} className='design-card-wrap'>
      <p>{data.name}</p>
      <Skeleton.Node>
        <DotChartOutlined
          style={{
            fontSize: 40,
            color: '#bfbfbf',
          }}
        />
      </Skeleton.Node>
    </div>
  )
}

export default DragCard
