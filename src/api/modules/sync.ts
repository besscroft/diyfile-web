import { API_URL } from '../../../config/config'
import type { Sync } from '~/api/interface/Sync'
import type { Result } from '~/api/interface'
import http from '~/api'

/**
 * @name 同步模块
 */
enum Api {
  TaskAdd = '/sync/taskAdd',
}

/** 添加同步任务 */
export const taskAdd = (data: Sync.TaskAddParam) => {
  return http.post<Result>(API_URL + Api.TaskAdd, data)
}
