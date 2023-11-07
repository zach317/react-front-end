import request from '@/utils/request'
// 查询用户绑定的信息
export function getUserAccountInfo() {
  return request('/users/user-account-info', {
    method: 'GET',
  })
}

export function sendSms(data) {
  return request('/users/send-sms', {
    method: 'POST',
    data,
  })
}

export function bindAccount(data) {
  return request('/users/bind-account', {
    method: 'POST',
    data,
  })
}

export function checkBind(data) {
  return request('/users/check-bind', {
    method: 'POST',
    data,
  })
}
