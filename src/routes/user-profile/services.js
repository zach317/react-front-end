import request from '@/utils/request'
// 查询username是否存在
export function checkUsername(data) {
  return request('/users/check-username', {
    method: 'POST',
    data,
  })
}

// 更新用户信息
export function updateUserInfo(data) {
  return request('/users/update-userinfo', {
    method: 'POST',
    data,
  })
}

// 更新头像
export function updateAvatar(data) {
  return request('/users/update-avatar', {
    method: 'POST',
    data,
  })
}
