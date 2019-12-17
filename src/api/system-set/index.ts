import request from '@/utils/request'
import { jopAdminBaseUrl, jopWXBaseUrl, appBaseUrl } from '@/api/pro-config'

// 验证短信查询
export function getSMSInfo() {
  return request({
    url: `${jopWXBaseUrl}/sms/query`,
    method: `POST`
  })
}

export function setSMSInfo(data: any) {
  return request({
    url: `${jopWXBaseUrl}/sms/update`,
    method: `POST`,
    data
  })
}

// 图片访问设置
export function getPictureSet() {
  return request({
    url: `${jopWXBaseUrl}/ftp/query`,
    method: `POST`,
    data: {}
  })
}

export function setPictureSet(data: any) {
  return request({
    url: `${jopWXBaseUrl}/ftp/update`,
    method: `POST`,
    data
  })
}

// 修改密码
export function getCompanyInfo(data: any) {
  return request({
    url: `${jopWXBaseUrl}/extra/companyinfo`,
    method: `POST`,
    data
  })
}

export function sendPhoneMsg(data: any) {
  return request({
    url: `${jopWXBaseUrl}/commonSms/send`,
    method: `POST`,
    data
  })
}

export function updatePsd(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/updateMainAccountPwd`,
    method: `POST`,
    data
  })
}

// 用户维护

// 职位
export function getAccountPositionList(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountPosition/listAccountPosition`,
    method: `POST`,
    data
  })
}

export function toCreatePositionMethods(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountPosition/postAccountPosition`,
    method: `POST`,
    data
  })
}

export function toUpdatePositionMethods(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountPosition/patchAccountPosition`,
    method: `POST`,
    data
  })
}

export function deletePositionMethods(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountPosition/delAccountPosition`,
    method: `POST`,
    data
  })
}

export function getAllAccountPositionListInfo(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountPosition/getAccountPositionInfo`,
    method: `POST`,
    data
  })
}

export function toBindAccountMethods(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountPosition/updatePositionDetail`,
    method: `POST`,
    data
  })
}

// 账户管理
export function getAccountGroups(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountGroup/listGroupNames`,
    method: `POST`,
    data
  })
}

export function searchAccountList(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountGroup/listGroupAccountInfo`,
    method: `POST`,
    data
  })
}

export function searchAPPlist(data: any) {
  return request({
    url: `${appBaseUrl}/jopBind/getJopAccountList`,
    method: `POST`,
    data
  })
}

export function JMPBingMethod(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/bindJmpAccount`,
    method: `POST`,
    data
  })
}

export function toCancelJMPBingMethod(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/unbindJmpAccount`,
    method: `POST`,
    data
  })
}

export function cancelAPPBingMethod(data: any) {
  return request({
    url: `${appBaseUrl}/jopBind/removeBindJopAccount`,
    method: `POST`,
    data
  })
}

export function updateAccountInfo(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/patchAccount`,
    method: `POST`,
    data
  })
}

export function updateJopAccountPwd(data: any) {
  return request({
    url: `${appBaseUrl}/jopBind/updateJopAccountPwd`,
    method: `POST`,
    data
  })
}

export function deleteAccountInfo(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/delAccount`,
    method: `POST`,
    data
  })
}

export function getAllChannelList() {
  return request({
    url: `${jopAdminBaseUrl}/channel/getChannelList`,
    method: `POST`,
  })
}

export function getAppsByChannel(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/appMenu/getChildAccountAppPermissions`,
    method: `POST`,
    data
  })
}

export function getAccountAllPermission(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/appMenu/getAppPermissions`,
    method: `POST`,
    data
  })
}

export function updateAccountPermissionMethods(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/appMenu/updateAppPermissions`,
    method: `POST`,
    data
  })
}

export function getAccountWithGroup(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountGroup/listGroupAccounts`,
    method: `POST`,
    data
  })
}

export function createAccountGroup(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountGroup/postAccountGroup`,
    method: `POST`,
    data
  })
}

export function createAccountInfo(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/postAccount`,
    method: `POST`,
    data
  })
}

export function toRemoveAccountGroup(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountGroup/delAccountGroup`,
    method: `POST`,
    data
  })
}

export function toUpdateAccountGroup(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/accountGroup/patchAccountGroup`,
    method: `POST`,
    data
  })
}

export function delAccountByBatch(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/delAccountByBatch`,
    method: `POST`,
    data
  })
}

export function updateAccountByBatch(data: any) {
  return request({
    url: `${jopAdminBaseUrl}/account/updateAccountByBatch`,
    method: `POST`,
    data
  })
}
