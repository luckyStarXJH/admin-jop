import msgValidate from './msg-set';
import userSet from './user-set';
import pictureSet from './picture-set';
import passwordSet from './password-set';

export default {
  path: '/system-set',
  component: () => import('@/layouts/LayoutMain.vue'),
  redirect: '/system-set/user-set/user-control/position-manage',
  meta: {
    isModule: true,
    moduleName: '系统设置',
    path: '/system-set'
  },
  children: [
    // 用户维护
    userSet,
    // 验证短信
    msgValidate,
    // 图片访问
    pictureSet,
    // 修改面膜
    passwordSet
  ]
}