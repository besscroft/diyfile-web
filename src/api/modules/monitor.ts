import { API_URL } from '../../../config/config'
import type { ResultData } from '~/api/interface'
import http from '~/api'

/**
 * @name 系统信息模块
 */
enum Api {
  ServerInfo = '/monitor/serverInfo',
}

/** 获取用户信息 */
export const getServerInfo = () => {
  return http.get<ResultData>(API_URL + Api.ServerInfo)
}
