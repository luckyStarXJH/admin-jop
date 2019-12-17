const baseUrl = '/super-crm/wx-mall'

const menu = {
  appName: '微商城',
  appCode: 'onlineShop',
  canAccess: false,
  path: baseUrl,
  icon: 'icon-shangcheng',
  children: [
    {
      appName: '微商城设置',
      appCode: 'shopSet',
      canAccess: false,
      children: [
        {
          appName: '界面设置',
          appCode: 'wxMallPage',
          canAccess: false,
          path: `${baseUrl}/page-set`,
        },
        {
          appName: '门店设置',
          appCode: 'wxMallStoreSet',
          canAccess: false,
          path: `${baseUrl}/shop-set`,
        },
        {
          appName: '商品详情编辑',
          appCode: 'wxMallProduct',
          canAccess: false,
          path: `${baseUrl}/product-detail`,
        },
        {
          appName: '商品搜索设置',
          appCode: 'wxSellRules',
          canAccess: false,
          path: `${baseUrl}/product-search`,
        },
        {
          appName: '显示参数设置',
          appCode: 'wxMallShowParam',
          canAccess: false,
          path: `${baseUrl}/show-param`,
        },
      ]
    }
  ]
}

export default menu;