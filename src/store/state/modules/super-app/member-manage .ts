const baseUrl = '/super-app/member-manage';

const menu = {
  appName: '会员管理系统',
  appCode: 'memberManagement',
  canAccess: false,
  path: baseUrl,
  icon: 'icon-huiyuan2',
  children: [
    {
      appName: '会员管理',
      appCode: 'memmMemberManagement',
      canAccess: false,
      path: `${baseUrl}/membership-manage`,
      children: [
        {
          appName: '消息提醒类型设置',
          appCode: 'memmMessageRemindType',
          canAccess: false,
          path: `${baseUrl}/membership-manage/message-reminder`,
        },
        {
          appName: '操作功能设置',
          appCode: 'memmMemberOperatSet',
          canAccess: false,
          path: `${baseUrl}/membership-manage/operation`,
        },
        {
          appName: '会员标签管理',
          appCode: 'memmMemberTagManagement',
          canAccess: false,
          path: `${baseUrl}/membership-manage/member-tag`,
        },
      ]
    },
  ]
}

export default menu;