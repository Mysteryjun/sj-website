export default {
  Layout: () => import('@/views/layout'),
  Home: () => import('@/views/home'),

  // 系统管理
  User: () => import('@/views/system/user'),
  Role: () => import('@/views/system/role'),
  Notice: () => import('@/views/system/notice'),
  Menu: () => import('@/views/system/menu'),
  Dict: () => import('@/views/system/dict'),
  Dept: () => import('@/views/system/dept'),
  Test: () => import('@/views/login'),

  // 音乐管理
  Song: () => import('@/views/music/song'),
  SongSheet: () => import('@/views/music/songSheet'),
  SongSheetDetail: () => import('@/views/music/songSheetDetail')
}