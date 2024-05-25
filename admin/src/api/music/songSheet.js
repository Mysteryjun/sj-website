import HttpRequest from '@/utils/request'

// 查询列表
export function listSongSheet (params = {}) {
  return HttpRequest('/music/songSheet', 'get', params)
}

// 查询某一个
export function getSongSheet (id) {
  return HttpRequest('/music/songSheet/' + id, 'get', {}, false)
}

// 添加
export function addSongSheet (params = {}) {
  return HttpRequest('/music/songSheet', 'post', params)
}

// 修改
export function updateSongSheet (params = {}) {
  return HttpRequest('/music/songSheet', 'put', params)
}

// 删除
export function delSongSheet (ids) {
  return HttpRequest('/music/songSheet/' + ids, 'delete')
}
