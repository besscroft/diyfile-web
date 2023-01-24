import { API_URL } from '../../../config/config'
import type { Result } from '~/api/interface'
import http from '~/api'

/**
 * @name 文件模块
 */
enum Api {
  getFileItem = '/file/getItem',
  getDefaultItem = '/file/defaultItem',
}

/** 获取文件列表 */
export const getFileItem = (storageId: number, folderPath: string) => {
  return http.get<Result>(API_URL + Api.getFileItem, { storageId, folderPath })
}

/** 获取默认文件列表 */
export const getDefaultItem = () => {
  return http.get<Result>(API_URL + Api.getDefaultItem)
}
