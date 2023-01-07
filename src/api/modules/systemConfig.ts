import { API_URL } from '../../../config/config'
import type { Result } from '~/api/interface'
import http from '~/api'

/**
 * @name 系统配置模块
 */
enum Api {
  GetConfig = '/systemConfig/getConfig',
  GetSiteTitle = '/systemConfig/getSiteTitle',
  GetSiteConfig = '/systemConfig/getSiteConfig',
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
