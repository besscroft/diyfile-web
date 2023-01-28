import { API_URL } from '../../../config/config'
import type { Result } from '~/api/interface'
import http from '~/api'

/**
 * @name 文件模块
 */
enum Api {
  getFileItem = '/file/getItem',
  getFileItemByKey = '/file/getItemByKey',
  getDefaultItem = '/file/defaultItem',
  getDefaultStorage = '/file/defaultStorage',
}

/** 获取文件列表 */
export const getFileItem = (storageId: number, folderPath: string) => {
  return http.get<Result>(API_URL + Api.getFileItem, { storageId, folderPath })
}

/** 获取文件列表 */
export const getFileItemByKey = (storageKey: string, folderPath: string) => {
  return http.post<Result>(API_URL + Api.getFileItemByKey, { storageKey, folderPath })
}

/** 获取默认文件列表 */
export const getDefaultItem = () => {
  return http.get<Result>(API_URL + Api.getDefaultItem)
}

/** 获取默认存储 */
export const getDefaultStorage = () => {
  return http.get<Result>(API_URL + Api.getDefaultStorage)
}
