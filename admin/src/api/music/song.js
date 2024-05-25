import HttpRequest from '@/utils/request'

// 查询列表
export function listSong (params = {}) {
  return HttpRequest('/music/song', 'get', params)
}

// 查询所有列表
export function AllSong (params = {}) {
  return HttpRequest('/music/allSong', 'get', params)
}

// 查询某一个
export function getSong (id) {
  return HttpRequest('/music/song/' + id, 'get', {}, false)
}

// 添加
export function addSong (params = {}) {
  return HttpRequest('/music/song', 'post', params)
}

// 修改
export function updateSong (params = {}) {
  return HttpRequest('/music/song', 'put', params)
}

// 删除
export function delSong (ids) {
  return HttpRequest('/music/song/' + ids, 'delete')
}
