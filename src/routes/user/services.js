import { request } from '../../utils/request'

export function userRegister(data) {
  return request(`/users/register`, {
    method: 'POST',
    data,
  })
}
