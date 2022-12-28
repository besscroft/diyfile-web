import { API_URL } from '../../../config/config'
import type { PageResultData, ReqPage, ResultData } from '~/api/interface'
import http from '~/api'

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
  return http.delete<ResultData>(`${API_URL + Api.StorageDelete}/${storageId}`)
}

/** 驱动详情接口 */
export const storageInfo = (storageId: number) => {
  return http.get<ResultData>(`${API_URL + Api.StorageInfo}/${storageId}`)
}
