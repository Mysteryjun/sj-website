import HttpRequest from '@/utils/request'

// 查询列表
export function allDepartment (params = {}) {
  return HttpRequest('/system/allDepartment', 'get', params, false)
}

// 查询单个
export function getDept (id) {
  return HttpRequest('/system/department/' + id, 'get', {}, false)
}

// 删除
export function delDept (ids) {
  return HttpRequest('/system/department/' + ids, 'delete')
}

// 添加
export function addDept (params) {
  return HttpRequest('/system/department', 'post', params)
}

// 修改
export function updateDept (params) {
  return HttpRequest('/system/department', 'put', params)
}
