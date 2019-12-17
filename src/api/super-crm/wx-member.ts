import request from '@/utils/request'
import { jopWXBaseUrl } from '@/api/pro-config'

// 查询门店
export function getWxShopList() {
  return request({
    url: `${jopWXBaseUrl}/wxShop/getWxShopWithShowStatusList`,
    method: `POST`,
    headers: {
      appCode: `onlineMember`
    }
  })
}

// 保存设置门店
export function setWxShopList(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxShop/postWxShopsettingsInfo`,
    method: `POST`,
    data,
    headers: {
      appCode: `onlineMember`
    }
  })
}

// 基础资料查询
export function getBasisData() {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/qryShareInfo`,
    method: `POST`,
  })
}

// 基础资料保存
export function setBasisData(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/updateWxCompany`,
    method: `POST`,
    data
  })
}

// 查询登录注册设置
export function getWxLoginRegister() {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/qryLoginSet`,
    method: `POST`,
  })
}

// 保存登录注册设置
export function setWxLoginRegister(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/updateWxRegister`,
    method: `POST`,
    data
  })
}

// 查询积分设置
export function getScoreSetting() {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/scoreSet`,
    method: `POST`,
  })
}

// 保存积分设置
export function setScoreSetting(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/updateScoreSet`,
    method: `POST`,
    data
  })
}

// 查询界面风格
export function getPageStyle() {
  return request({
    url: `${jopWXBaseUrl}/wxSurface/getSurfaceSet`,
    method: `POST`,
  })
}

// 保存界面风格
export function setPageStyle(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxSurface/postSurfaceSet`,
    method: `POST`,
    data
  })
}

// 查询会员声明
export function getMemberStatement() {
  return request({
    url: `${jopWXBaseUrl}/wxExplain/getMemberExplain`,
    method: `POST`,
    data: {}
  })
}

// 保存会员声明
export function setMemberStatement(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxExplain/postOrUpdateMemberExplain`,
    method: `POST`,
    data
  })
}

// 查询门店推广二维码列表
export function getShopListInfo(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxShop/getWxShopList`,
    method: `POST`,
    data
  })
}

export function patchWxCodeShop(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxShop/patchWxCode`,
    method: `POST`,
    data
  })
}

// 查询营业员推广二维码列表
export function getSalerListInfo(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxSalesSet/getWxSaleInfo`,
    method: `POST`,
    data
  })
}

export function patchWxCodeSaler(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxSalesSet/patchWxCode`,
    method: `POST`,
    data
  })
}

// 每日签到查询
export function getMemberSignSetting() {
  return request({
    url: `${jopWXBaseUrl}/sign/getMemberSign`,
    method: `POST`,
  })
}

// 每日签到保存
export function setMemberSignSetting(data: any) {
  return request({
    url: `${jopWXBaseUrl}/sign/updateMemberSign`,
    method: `POST`,
    data
  })
}

// 查询二维码模板
export function getCodeTemplate(data: any) {
  return request({
    url: `${jopWXBaseUrl}/codeTemplate/query`,
    method: `POST`,
    data
  })
}

// 删除模板
export function deleteCodeTemplate(data: any) {
  return request({
    url: `${jopWXBaseUrl}/codeTemplate/del`,
    method: `POST`,
    data
  })
}

// 新增模板
export function addCodeTemplate(data: any) {
  return request({
    url: `${jopWXBaseUrl}/codeTemplate/save`,
    method: `POST`,
    data
  })
}

// 修改模板
export function updateCodeTemplate(data: any) {
  return request({
    url: `${jopWXBaseUrl}/codeTemplate/update`,
    method: `POST`,
    data
  })
}

// 生成推广图片
export function builderQrcode(data: any) {
  return request({
    url: '/jop-wx-web/imagehandler/builderQrcode',
    method: 'GET',
    data
  })
}

// 生成推广图片
/* export function builderQrcode(data: any) {
  return request({
    url: '/jop-wx-web/imagehandler/builderQrcode',
    method: 'POST',
    responseType: 'blob',
    data
  })
} */
