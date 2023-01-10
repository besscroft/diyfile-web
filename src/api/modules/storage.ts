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
}

/** 驱动分页列表 */
export const storagePage = (params: ReqPage) => {
  return http.get<PageResultData>(API_URL + Api.StoragePage, params)
}

/** 驱动删除接口 */
export const storageDelete = (storageId: number) => {
  return http.delete<Result>(`${API_URL + Api.StorageDelete}/${storageId}`)
}

/** 驱动详情接口 */
export const storageInfo = (storageId: number) => {
  return http.get<Result>(`${API_URL + Api.StorageInfo}/${storageId}`)
}

/** 驱动新增接口 */
export const storageAdd = (data: Storage.AddStorageRequestData) => {
  return http.post(API_URL + Api.StorageAdd, data)
}

/** 驱动更新接口 */
export const storageUpdate = (data: Storage.UpdateStorageRequestData) => {
  return http.put(API_URL + Api.StorageUpdate, data)
}
