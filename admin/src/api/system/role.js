import HttpRequest from '@/utils/request'

// 查询所有角色
export function allRole (params = {}) {
  return HttpRequest('/system/allRole', 'get', params)
}

// 查询某个角色
export function getRole (id) {
  return HttpRequest('/system/role/' + id, 'get', {}, false)
}

// 查询角色
export function listRole (params = {}) {
  return HttpRequest('/system/role', 'get', params)
}

// 添加角色
export function addRole (params = {}) {
  return HttpRequest('/system/role', 'post', params)
}

// 修改角色
export function updateRole (params = {}) {
  return HttpRequest('/system/role', 'put', params)
}

// 删除角色
export function delRole (ids) {
  return HttpRequest('/system/role/' + ids, 'delete')
}

// 更新角色状态
export function changeRoleStatus (id, params = {}) {
  return HttpRequest(`/system/role/${id}/updateStatus`, 'put', params)
}
