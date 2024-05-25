import HttpRequest from '@/utils/request'

// 查询列表
export function listSongSheetDetail (songSheetId, params = {}) {
  return HttpRequest('/music/songSheetDetail/' + songSheetId, 'get', params)
}

// 更新
export function addSongSheetDetail (songSheetId, params = {}) {
  return HttpRequest('/music/songSheetDetail/' + songSheetId, 'put', params)
}

// 删除
export function delSongSheetDetail (ids) {
  return HttpRequest('/music/songSheetDetail/' + ids, 'delete')
}
