import { API_URL } from '../../../config/config'
import type { PageResultData, ReqPage, Result } from '~/api/interface'
import http from '~/api'
import type { Storage } from '~/api/interface/storage'

/**
 * @name 存储模块
 */
enum Api {
  StoragePage = '/storage/storagePage',
  StorageDelete = '/storage/delete',
  StorageAdd = '/storage/add',
  StorageUpdate = '/storage/update',
  StorageInfo = '/storage/info',
  StorageInfoByKey = '/storage/infoByKey',
  StorageUpdateStatus = '/storage/updateStatus',
  StorageSetDefault = '/storage/setDefault',
  GetEnableStorage = '/storage/getEnableStorage',
  GetAwsRegions = '/storage/getAwsRegions',
}

/** 存储分页列表 */
export const storagePage = (params: ReqPage) => {
  return http.get<PageResultData>(API_URL + Api.StoragePage, params)
}

/** 存储删除接口 */
export const storageDelete = (storageId: number) => {
  return http.delete<Result>(`${API_URL + Api.StorageDelete}/${storageId}`)
}

/** 存储详情接口 */
export const storageInfo = (storageId: number) => {
  return http.get<Result>(`${API_URL + Api.StorageInfo}/${storageId}`)
}

/** 存储详情接口(不鉴权，脱敏处理) */
export const storageInfoByStorageKey = (storageKey: string) => {
  return http.get<Result>(`${API_URL + Api.StorageInfoByKey}/${storageKey}`)
}

/** 存储新增接口 */
export const storageAdd = (data: Storage.AddStorageRequestData | any) => {
  return http.post(API_URL + Api.StorageAdd, data)
}

/** 存储更新接口 */
export const storageUpdate = (data: Storage.UpdateStorageRequestData) => {
  return http.put(API_URL + Api.StorageUpdate, data)
}

/** 存储更新状态接口 */
export const storageUpdateStatus = (data: Storage.UpdateStorageStatusRequestData) => {
  return http.put(API_URL + Api.StorageUpdateStatus, data)
}

/** 设置默认存储 */
export const storageSetDefault = (storageId: number) => {
  return http.put<Result>(`${API_URL + Api.StorageSetDefault}/${storageId}`)
}

/** 获取可用存储 */
export const getEnableStorage = () => {
  return http.get<Result>(API_URL + Api.GetEnableStorage)
}

/** 获取 aws 区域列表 */
export const getAwsRegions = () => {
  return http.get<Result>(API_URL + Api.GetAwsRegions)
}
