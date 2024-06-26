import HttpRequest from '@/utils/request'

// 查询列表
export function listUser (params = {}) {
  return HttpRequest('/system/user', 'get', params)
}

// 查询某个用户
export function getUser (id) {
  return HttpRequest('/system/user/' + id, 'get', {}, false)
}

// 删除
export function delUser (ids = []) {
  return HttpRequest('/system/user/' + ids, 'delete')
}

// 新增
export function addUser (params = {}) {
  return HttpRequest('/system/user', 'post', params)
}

// 修改
export function updateUser (params = {}) {
  return HttpRequest('/system/user', 'put', params)
}

// 修改
export function updateUserImg (params = {}) {
  return HttpRequest('/system/updateUserImg', 'put', params)
}

// 导出
export function exportUser (params = {}) {
  return HttpRequest('/system/user/export', 'get', params)
}

// 用户重置密码
export function updateUserPwd (userId, params = {}) {
  return HttpRequest(`/system/user/${userId}/resetPwd`, 'put', params)
}

// 超级管理员重置密码
export function updateUserPwdByAdmin (userId, params = {}) {
  return HttpRequest(`/system/user/${userId}/adminResetPwd`, 'put', params)
}

// 用户状态修改
export function changeUserStatus (userId, params = {}) {
  return HttpRequest(`/system/user/${userId}/updateStatus`, 'put', params)
}

// 导出模板
export function importTemplate (params = {}) {
  return HttpRequest('/system/user/import', 'get', params)
}

// 获取用户信息
export function getInfo (params = {}) {
  return HttpRequest('/system/getInfo', 'get', params, false)
}
