import HttpRequest from '@/utils/request'

// 获取概览
export function listBanner (params = {}) {
  return HttpRequest('/system/banner', 'get', params)
}

// 获取某个概览
export function getBanner (id) {
  return HttpRequest('/system/banner/' + id, 'get', {}, false)
}

// 删除概览
export function delBanner (ids) {
  return HttpRequest('/system/banner/' + ids, 'delete')
}

// 添加概览
export function addBanner (params = {}) {
  return HttpRequest('/system/banner', 'post', params)
}

// 修改概览
export function updateBanner (params = {}) {
  return HttpRequest('/system/banner', 'put', params)
}
