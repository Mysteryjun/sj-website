import HttpRequest from '@/utils/request'

// 查询列表
export function listType (params = {}) {
  return HttpRequest('/system/dict_type', 'get', params)
}

// 查询某一个
export function getType (id) {
  return HttpRequest('/system/dict_type/' + id, 'get', {}, false)
}

// 删除
export function delType (ids) {
  return HttpRequest('/system/dict_type/' + ids, 'delete')
}

// 添加
export function addType (params = {}) {
  return HttpRequest('/system/dict_type', 'post', params)
}

// 修改
export function updateType (params = {}) {
  return HttpRequest('/system/dict_type', 'put', params)
}
