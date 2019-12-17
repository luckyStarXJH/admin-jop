import request from '@/utils/request'
import { jopAdminBaseUrl, jopWXBaseUrl, jopWebBaseUrl, jopCustomerBaseUrl } from '@/api/pro-config'

// 超级crm统计信息
export function getSuperCrmCountInfo(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/qryCounts`,
    method: `POST`,
    data,
  })
}

// 查询快捷菜单
export function getShortcutMenu(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/qryQuickMenu`,
    method: `POST`,
    data,
  })
}

// 设置快捷菜单
export function setShortcutMenu(data: any) {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/updateWxCompany`,
    method: `POST`,
    data,
  })
}

interface ChartsDataData {
  startTime: string;
  endTime: string;
}

// 查询统计图数据
export function getChartsData(data: ChartsDataData) {
  return request({
    url: `${jopWXBaseUrl}/wxCompany/qryMemberChat`,
    method: `POST`,
    data,
  })
}

