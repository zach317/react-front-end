/* eslint-disable import/prefer-default-export */
import request from '@/utils/request'

export function getUserinfo(params) {
  return request('/users/get-userinfo', {
    method: 'GET',
    params,
  })
}
