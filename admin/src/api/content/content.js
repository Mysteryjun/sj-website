import HttpRequest from '@/utils/request'

// 获取内容
export function listContent (params = {}) {
  return HttpRequest('/system/content', 'get', params)
}

// 获取某个内容
export function getContent (id) {
  return HttpRequest('/system/content/' + id, 'get', {}, false)
}

// 删除内容
export function delContent (ids) {
  return HttpRequest('/system/content/' + ids, 'delete')
}

// 添加内容
export function addContent (params = {}) {
  return HttpRequest('/system/content', 'post', params)
}

// 修改内容
export function updateContent (params = {}) {
  return HttpRequest('/system/content', 'put', params)
}
