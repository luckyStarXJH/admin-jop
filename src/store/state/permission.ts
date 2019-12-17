// == 超级CRM
// 首页
import home from './modules/super-crm/home';
// 微会员路径
import wxMemberModuleMenu from './modules/super-crm/wxMember';
// 微好礼
import pointMallMenu from './modules/super-crm/point-mall';
// 微证书
import wxCredential from './modules/super-crm/wx-credential';
// 微保单
import wxQualityPolicy from './modules/super-crm/wxQualityPolicy';
// 微客服
import wxChatModuleMenu from './modules/super-crm/wxChat';
// 微客服
import wxMallModuleMenu from './modules/super-crm/wx-mall';
// 微客服
import wxWebsiteModuleMenu from './modules/super-crm/wx-website';
// 参数设置
import systemSetting from './modules/super-crm/system-setting';

// 超级CRM
export const superCRM = {
  appName: '超级CRM',
  appCode: 'superCRM',
  canAccess: false,
  path: '/super-crm',
  children: [
    // 首页
    home,
    // 微会员
    wxMemberModuleMenu,
    // 微保单
    wxQualityPolicy,
    // 微好礼
    pointMallMenu,
    // 微证书
    wxCredential,
    // 微客服
    wxChatModuleMenu,
    // 微商城
    wxMallModuleMenu,
    // 微官网
    wxWebsiteModuleMenu,
    // 参数设置
    systemSetting,
  ]
}


// == 超级MKT

import superMKThome from './modules/super-mkt/home';
// 奖品设置
import superMKTPrizeSet from './modules/super-mkt/prize-set';
// 活动设置
import superMKTActivitySet from './modules/super-mkt/activity-set';
// 营销推广
import superMKTspreadSet from './modules/super-mkt/spread-set';

// 超级MKT
export const superMKT = {
  appName: '超级MKT',
  appCode: 'superMKT',
  canAccess: false,
  path: '/super-mkt',
  children: [
    superMKThome,
    // 奖品设置
    superMKTPrizeSet,
    // 活动设置
    superMKTActivitySet,
    // 营销推广
    superMKTspreadSet
  ]
}

// == 超级App
import superAPPHome from './modules/super-app/home';
import superAPPPhoneMemberManage from './modules/super-app/member-manage ';
import superAPPPhoneClientManage from './modules/super-app/client-manage';
import superAPPPhoneGoldPrice from './modules/super-app/gold-price';

export const superAPP = {
  appName: '超级App',
  appCode: 'superAPP',
  canAccess: false,
  path: '/super-app',
  children: [
    superAPPHome,
    superAPPPhoneMemberManage,
    superAPPPhoneClientManage,
    superAPPPhoneGoldPrice
  ]
}

// == 系统设置

import systemSetMsgValidate from './modules/system-set/msg-set';
import systemSetUserSetting from './modules/system-set/user-set';
import systemSetPictureSetting from './modules/system-set/picture-set';
import systemSetPasswordSetting from './modules/system-set/password-set';

// 系统设置
export const systemSet = {
  appName: '系统设置',
  appCode: 'SYSET',
  canAccess: false,
  path: '/system-set',
  children: [
    // 用户维护
    systemSetUserSetting,
    // 验证短信
    systemSetMsgValidate,
    // 图片
    systemSetPictureSetting,
    // 修改密码
    systemSetPasswordSetting
  ]
}