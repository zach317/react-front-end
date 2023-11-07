import React, { useState } from 'react'
import { Input, Button, Form, Space, message } from 'antd'
import { PHONE_PATTERN, EMAIL_PATTERN } from '@/utils/utils.js'
import { sendSms, bindAccount, checkBind } from '../services'
import './index.less'

const { Item, useForm } = Form

const BindSetting = ({ bindData, type: bindType, modal, getInfo, title }) => {
  let intervalId = null
  const initTime = 60
  const pattern = bindType === 'email' ? EMAIL_PATTERN : PHONE_PATTERN
  const [form] = useForm()
  const [step, setStep] = useState(bindData ? 1 : 2)
  const [count, setCount] = useState(initTime)
  const handleSendSms = () => {
    form.validateFields([bindType]).then(async (value) => {
      try {
        if (step === 1) {
          const checkRes = await checkBind(value)
          if (!checkRes.success) {
            message.warning(checkRes.message)
            return
          }
        }
        const res = await sendSms(value)
        if (res.success) {
          message.success(
            `发送成功，您的验证码为${res.data.code},不过这没什么用，你随便输也能校验通过`
          )
          setCount(initTime - 1)
          intervalId = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount > 1) {
                return prevCount - 1
              }
              clearInterval(intervalId) // 清除 setInterval
              return initTime
            }) // 使用回调函数更新 count
          }, 1000)
        }
      } catch (error) {
        message.warning(error.message)
      }
    })
    // 在按钮点击时禁用按钮立即执行一次
  }
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      if (step === 1) {
        setStep(2)
        intervalId = null
        clearInterval(intervalId) // 清除 setInterval
        setCount(0)
        form.resetFields()
        return
      }
      const res = await bindAccount(values)
      if (res.success) {
        message.success('绑定成功')
        modal.destroy()
        getInfo()
      }
    })
  }
  return (
    <div className='bind-setting-wrap'>
      <p className='bind-title-tip'>
        {step === 1
          ? `请输入${bindData}完整的${title}`
          : `请输入要绑定的${title}`}
        ，并获取验证码
      </p>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
        <Item
          rules={[
            {
              required: true,
              message: `请输入${title}`,
            },
            {
              pattern,
              message: `请输入正确的${title}`,
            },
          ]}
          label={title}
          name={bindType}
        >
          <Input placeholder='请输入' />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          label='验证码'
          name='smsCode'
        >
          <Space>
            <Item noStyle name='smsCode'>
              <Input placeholder='请输入' />
            </Item>
            <Button
              onClick={handleSendSms}
              disabled={count < initTime && count !== 0}
              type='primary'
            >
              {`获取验证码 ${
                count >= initTime || count === 0 ? '' : `(${count})`
              }`}
            </Button>
          </Space>
        </Item>
      </Form>
      <Space className='modal-btn-group'>
        <Button onClick={modal.destroy}>取消</Button>
        <Button type='primary' onClick={handleSubmit}>
          {step === 1 ? '下一步' : '完成'}
        </Button>
      </Space>
    </div>
  )
}

export default BindSetting
