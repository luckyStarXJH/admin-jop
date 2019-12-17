const pointMallBaseUrl = '/super-crm/point-mall'

const pointMallMenu = {
  appName: '微好礼',
  appCode: 'creditShop',
  canAccess: false,
  path: pointMallBaseUrl,
  icon: 'icon-iconfuxing_lipin',
  children: [
    {
      appName: '微好礼设置',
      appCode: 'wxCreditShop',
      canAccess: false,
      children: [
        {
          appName: '门店设置',
          appCode: 'store',
          canAccess: false,
          path: `${pointMallBaseUrl}/shop-set`,
          children: []
        },
        {
          appName: '界面设置',
          appCode: 'Integral_interface',
          canAccess: false,
          path: `${pointMallBaseUrl}/view-set`,
          children: []
        },
        {
          appName: '礼品详情编辑',
          appCode: 'Gift_details',
          canAccess: false,
          path: `${pointMallBaseUrl}/product-detail-edit`,
          children: []
        },
        {
          appName: '礼品兑换记录',
          appCode: 'Gift_exchange',
          canAccess: false,
          path: `${pointMallBaseUrl}/exchange-history`,
          children: []
        },
      ]
    }
  ]
}

export default pointMallMenu;