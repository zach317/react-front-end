import { request } from '../../utils/request'

//注册
export function userRegister(data) {
  return request(`/users/register`, {
    method: 'POST',
    data,
  })
}

//查询username是否存在
export function checkUsername(data) {
  return request(`/users/check-username`, {
    method: 'POST',
    data,
  })
}
