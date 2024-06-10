import HttpRequest from '@/utils/request'

// 获取概览
export function listNotice (params = {}) {
  return HttpRequest('/system/info', 'get', params)
}

// 获取某个概览
export function getNotice (id) {
  return HttpRequest('/system/info/' + id, 'get', {}, false)
}

// 删除概览
export function delNotice (ids) {
  return HttpRequest('/system/info/' + ids, 'delete')
}

// 添加概览
export function addNotice (params = {}) {
  return HttpRequest('/system/info', 'post', params)
}

// 修改概览
export function updateNotice (params = {}) {
  return HttpRequest('/system/info', 'put', params)
}
