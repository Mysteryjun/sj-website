export default {
  Layout: () => import('@/views/layout'),
  Home: () => import('@/views/home'),
  Banner: () => import('@/views/banner'),
  Service: () => import('@/views/service'),
  // 内容管理
  Info: () => import('@/views/content/info'),
  Notice: () => import('@/views/content/notice'),
  Doctor: () => import('@/views/content/doctor'),
  Culture: () => import('@/views/content/culture'),
  Dept: () => import('@/views/content/dept'),
  // 系统管理
  User: () => import('@/views/system/user'),
  Role: () => import('@/views/system/role'),
  Menu: () => import('@/views/system/menu'),
  Dict: () => import('@/views/system/dict'),

  Test: () => import('@/views/login')
}
