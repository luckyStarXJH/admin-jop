const router = {
  path: 'member-manage',
  component: () => import('@/views/super-app/member-manage/index.vue'),
  meta: {
  },
  children: [
    // 会员管理设置
    {
      path: 'membership-manage',
      component: () => import('@/views/super-app/member-manage/index.vue'),
      meta: {
        title: '会员管理',
        icon: 'icon-price',
      },
      redirect: '/super-app/member-manage/membership-manage',
      children: [
        {
          path: 'message-reminder',
          component: () => import('@/views/super-app/member-manage/membership-manage/pages/messageReminder.vue'),
          meta: {
            title: '消息提醒类型设置',
            icon: 'icon-message',
          },
        },
        {
          path: 'operation',
          component: () => import('@/views/super-app/member-manage/membership-manage/pages/operation.vue'),
          meta: {
            title: '操作功能设置',
            icon: 'icon-gongnengshezhi',
          },
        },
        {
          path: 'member-tag',
          component: () => import('@/views/super-app/member-manage/membership-manage/pages/memberTag.vue'),
          meta: {
            title: '会员标签管理',
            icon: 'icon-huiyuanbiaoqian',
          },
        }
      ]
    },
  ]
}

export default router;