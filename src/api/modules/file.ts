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
  getFileInfo = '/file/getFileInfo',
  getUploadUrl = '/file/getUploadUrl',
  deleteFile = '/file/deleteFile',
  getDownloadUrl = '/file/getDownloadUrl',
  getDownloadFile = '/file/getDownloadFile',
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

/** 获取文件信息 */
export const getFileInfo = (storageKey: string, filePath: string, fileName: string) => {
  return http.post<Result>(API_URL + Api.getFileInfo, { storageKey, filePath, fileName })
}

/** 获取上传地址 */
export const getUploadUrl = (storageKey: string, path: string) => {
  return http.post<Result>(API_URL + Api.getUploadUrl, { storageKey, path })
}

/** 删除文件 */
export const deleteFile = (storageKey: string, path: string) => {
  return http.post<Result>(API_URL + Api.deleteFile, { storageKey, path })
}

/** 获取下载地址 */
export const getDownloadUrl = (storageKey: string, path: string, fullPath: string) => {
  return http.post<Result>(API_URL + Api.getDownloadUrl, { storageKey, path, fullPath })
}

/** 下载文件 */
export const getDownloadFile = (storageKey: string, path: string) => {
  return http.post<Result>(API_URL + Api.getDownloadFile, { storageKey, path })
}
