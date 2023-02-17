import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, Select, Avatar, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import debounce from 'debounce-promise'
import { useOutletContext } from 'react-router-dom'
import { checkUsername, updateUserInfo } from './services'
import './index.less'

const options = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
]
const UserProfile = () => {
  const { user, getUserinfoFunc = () => {} } = useOutletContext()
  const { age, birth, gender, nickname, username, id } = user
  const formatBirth = (date) => dayjs(date).format('YYYY-MM-DD')
  const { Item, useForm } = Form
  const [form] = useForm()
  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        const res = await updateUserInfo({
          ...values,
          birth: formatBirth(values.birth),
          id,
        })
        if (res.success) {
          await getUserinfoFunc()
          message.success('资料修改成功')
        }
        setIsEdit(false)
      } catch (error) {
        message.warning(error.message)
      }
    })
  }

  const handleDataPickerChange = (value) => {
    const birthday = dayjs(value).valueOf()
    const today = dayjs().valueOf()
    const sumAge = Math.floor(
      parseInt((today - birthday) / 1000, 10) / 86400 / 365
    )
    form.setFieldsValue({ age: sumAge })
  }

  const handleCheckUsername = async (name) => {
    try {
      const res = await checkUsername({ name })
      return res
    } catch (error) {
      return false
    }
  }

  const dataShow = [
    {
      name: '用户名',
      data: username,
      title: 'username',
      rules: [
        {
          required: true,
          message: '请输入用户名',
        },
        {
          pattern: /^[a-zA-Z][a-zA-Z0-9_-]{3,15}$/,
          message: '用户名仅支持字母、数字、_和—且必须以字母开头,4-16位',
        },
        {
          validator: debounce(async (_, value) => {
            if (!value) return
            // 不校验当前用户名
            if (value === username) return
            const res = await handleCheckUsername(value)
            if (res.success) {
              return Promise.resolve()
            }
            return Promise.reject(new Error(res.message))
          }, 500),
        },
      ],
    },
    {
      name: '昵称',
      data: nickname,
      title: 'nickname',
      rules: [
        {
          required: true,
          message: '请输入昵称',
        },
        {
          pattern: /^[^\s]*$/,
          message: '不能输入空格',
        },
      ],
    },
    {
      name: '年龄',
      data: age,
      title: 'age',
      disabled: true,
    },
    {
      name: '性别',
      data: gender,
      title: 'gender',
      render: <Select value={gender} options={options} />,
    },
    {
      name: '生日',
      data: formatBirth(birth),
      title: 'birth',
      render: (
        <DatePicker
          onChange={handleDataPickerChange}
          style={{ width: '100%' }}
        />
      ),
    },
  ]

  const ShowEl = (
    <div className='show-wrap'>
      {dataShow.map((item) => (
        <div key={item.title} className='show-item'>
          <span className='show-label'>{item.name}:</span>
          <span className='show-value'>{item.data}</span>
        </div>
      ))}
    </div>
  )

  const FormEL = (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 20,
      }}
      labelAlign='left'
      form={form}
      initialValues={{
        ...user,
        birth: dayjs(birth),
      }}
      requiredMark={false}
    >
      {dataShow.map((item) => (
        <Item
          rules={item.rules}
          name={item.title}
          key={item.name}
          label={item.name}
        >
          {item.render || (
            <Input
              className={isEdit ? 'edit' : ''}
              disabled={item.disabled || !isEdit}
            />
          )}
        </Item>
      ))}
    </Form>
  )

  return (
    <div className='user-profile-wrap'>
      <div className='user-profile-left user-profile-item'>
        <Avatar size={100} icon={<UserOutlined />} />
        <div className='user-category-wrap'>
          <div className='category-item'>
            <span className='category-label'>类目1</span>
            <span className='category-value'>100000</span>
          </div>
          <div className='category-item'>
            <span className='category-label'>类目2</span>
            <span className='category-value'>100000</span>
          </div>
          <div className='category-item'>
            <span className='category-label'>类目3</span>
            <span className='category-value'>100000</span>
          </div>
        </div>
      </div>
      <div className='user-profile-right user-profile-item'>
        {isEdit ? FormEL : ShowEl}
        <div className='btn-group'>
          <Button
            className='btn'
            onClick={isEdit ? handleSubmit : handleEdit}
            type='primary'
          >
            {isEdit ? '提交' : '编辑'}
          </Button>
          {isEdit && (
            <Button className='btn' onClick={() => setIsEdit(false)}>
              取消
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
