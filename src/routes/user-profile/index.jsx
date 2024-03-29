import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Avatar,
  message,
  Upload,
} from 'antd'
import { UserOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useOutletContext } from 'react-router-dom'
import {
  debounceReturn,
  NO_SPACER_PATTERN,
  USERNAME_PATTERN,
} from '@/utils/utils'
import { checkUsername, updateUserInfo } from './services'
import './index.less'

const options = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
]
const UserProfile = () => {
  const { user, getUserinfoFunc = () => {} } = useOutletContext()
  const { age, birth, gender, nickname, username } = user
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
          pattern: USERNAME_PATTERN,
          message: '用户名仅支持字母、数字、_和—且必须以字母开头,4-16位',
        },
        {
          validator: debounceReturn(handleCheckUsername, username),
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
          pattern: NO_SPACER_PATTERN,
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

  const handleAvatarChange = async ({ file }) => {
    if (file.status === 'done') {
      message.success('上传成功')
      await getUserinfoFunc()
    }
  }

  return (
    <div className='user-profile-wrap'>
      <div className='user-profile-left user-profile-item'>
        <Upload
          name='avatar'
          onChange={handleAvatarChange}
          showUploadList={false}
          action='/api/users/update-avatar'
          className='upload-avatar'
          headers={{
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }}
        >
          <div className='avatar-relative'>
            <EditOutlined className='edit-logo' />
            <Avatar size={100} icon={<UserOutlined />} src={`${user.avatar}`} />
          </div>
        </Upload>
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
