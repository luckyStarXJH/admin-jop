import Vue from 'vue';
import Router from 'vue-router';

// == 超级CRM

import superCrmHome from './modules/super-crm/home';
import wxMemberRouter from './modules/super-crm/wx-member';
import wxQualityPolicy from './modules/super-crm/wx-quality-policy';
import wxChatRouter from './modules/super-crm/wx-chat';
import pointMallRouter from './modules/super-crm/point-mall';
import wxCredential from './modules/super-crm/wx-credential';
import wxMall from './modules/super-crm/wx-mall';
import wxWebSite from './modules/super-crm/wx-website';
import systemSetting from './modules/super-crm/system-settting';

// == 超级CKT

import superMKTHome from './modules/super-mkt/home';
// 活动设置
import superMKT from './modules/super-mkt/activity-set';
// 奖品设置
import superMKTPrizeSet from './modules/super-mkt/prize-set';
// 奖品设置
import superMKTMarketPromotion from './modules/super-mkt/market-promotion';

import superMKTSpreadSet from './modules/super-mkt/spread-set';

// == 超级APP
import superAPPHome from './modules/super-app/home';
// 会员管理
import superAPPMemberManage from './modules/super-app/member-manage';
// 客户端管理
import superAPPClientManage from './modules/super-app/client-manage';
// 金价
import superAPPGoldPrice from './modules/super-app/gold-price';

// == 系统设置
import systemSet from './modules/system-set';

Vue.use(Router);

export default new Router({
  routes: [
    // 登录页面
    {
      path: '/',
      redirect: '/login',
      meta: {
        isIgnore: true,
      },
    },
    // 登录页面
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        isIgnore: true,
      }
    },
    // 首页
    {
      path: '/home',
      component: () => import('@/layouts/LayoutOnlyHeader.vue'),
      redirect: '/home/module',
      meta: {
        isIgnore: true,
      },
      children: [
        {
          path: 'module',
          component: () => import('@/views/home/index.vue'),
        }
      ]
    },
    // 超级CRM
    {
      path: '/super-crm',
      component: () => import('@/layouts/LayoutMain.vue'),
      redirect: '/super-crm/home',
      meta: {
        isModule: true,
        moduleName: '超级CRM',
        path: '/super-crm/home',
      },
      children: [
        // 首页
        superCrmHome,
        // 积分商城
        pointMallRouter,
        // 微会员
        wxMemberRouter,
        // 微客服
        wxChatRouter,
        // 微保单
        wxQualityPolicy,
        // 微证书
        wxCredential,
        // 微商城
        wxMall,
        // 微官网
        wxWebSite,
        // 参数设置
        systemSetting
      ]
    },
    // 超级MKT
    {
      path: '/super-mkt',
      component: () => import('@/layouts/LayoutMain.vue'),
      redirect: '/super-mkt/home',
      meta: {
        isModule: true,
        moduleName: '超级MKT',
        path: '/super-mkt/home'
      },
      children: [
        // 首页
        superMKTHome,
        // 活动设置
        superMKT,
        // 奖品设置
        superMKTPrizeSet,
        superMKTSpreadSet,
        superMKTPrizeSet,
        superMKTMarketPromotion
      ]
    },
    // 超级APP
    {
      path: '/super-app',
      component: () => import('@/layouts/LayoutMain.vue'),
      // redirect: '/super-app/home',
      redirect: '/super-app/member-manage/membership-manage/message-reminder',
      meta: {
        isModule: true,
        moduleName: '超级APP',
        // path: '/super-app/home',
        path: '/super-app/member-manage/membership-manage/message-reminder'
      },
      children: [
        superAPPHome,
        superAPPMemberManage,
        superAPPClientManage,
        superAPPGoldPrice
      ]
    },
    // 系统设置
    systemSet
  ],
});
