import { API_URL } from '../../../config/config'
import type { SystemConfig } from '~/api/interface/systemConfig'
import type { Result } from '~/api/interface'
import http from '~/api'

/**
 * @name 系统配置模块
 */
enum Api {
  GetConfig = '/systemConfig/getConfig',
  GetSiteTitle = '/systemConfig/getSiteTitle',
  GetSiteConfig = '/systemConfig/getSiteConfig',
  GetBeian = '/systemConfig/getBeian',
  UpdateConfig = '/systemConfig/updateConfig',
  GetBarkId = '/systemConfig/getBarkId',
  GetBarkStatus = '/systemConfig/getBarkStatus',
}

/** 获取系统配置 */
export const getConfig = () => {
  return http.get<Result>(API_URL + Api.GetConfig)
}

/** 获取网站标题 */
export const getSiteTitle = () => {
  return http.get<Result>(API_URL + Api.GetSiteTitle)
}

/** 获取网站配置 */
export const getSiteConfig = () => {
  return http.get<Result>(API_URL + Api.GetSiteConfig)
}

/** 获取备案信息 */
export const getBeian = () => {
  return http.get<Result>(API_URL + Api.GetBeian)
}

/** 更新系统配置 */
export const updateConfig = (data: SystemConfig.UpdateConfigData) => {
  return http.put<Result>(API_URL + Api.UpdateConfig, data)
}

/** 获取 Bark 推送 id */
export const getBarkId = () => {
  return http.get<Result>(API_URL + Api.GetBarkId)
}

/** 获取 Bark 推送状态 */
export const getBarkStatus = () => {
  return http.get<Result>(API_URL + Api.GetBarkStatus)
}
