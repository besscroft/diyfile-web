import { API_URL } from '../../../config/config'
import type { Login, PageResultData, ReqPage, Result } from '~/api/interface'
import type { User } from '~/api/interface/user'
import http from '~/api'

/**
 * @name 登录模块
 */
enum Api {
  Login = '/user/login',
  GetUserInfo = '/user/info',
  LoginOut = '/user/loginOut',
  UserPage = '/user/userPage',
  UserDelete = '/user/delete',
  GetUserInfoByUserName = '/user/info',
  UserAdd = '/user/add',
  UserUpdate = '/user/add',
}

/** 用户登录接口 */
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(API_URL + Api.Login, params, { headers: { noLoading: true } })
}

/** 获取用户信息 */
export const getInfo = () => {
  return http.get<any>(API_URL + Api.GetUserInfo)
}

/** 退出登录 */
export const loginOut = () => {
  return http.post<Result>(API_URL + Api.LoginOut)
}

/** 用户分页列表 */
export const userPage = (params: ReqPage) => {
  return http.get<PageResultData>(API_URL + Api.UserPage, params)
}

/** 用户删除接口 */
export const userDelete = (userId: number) => {
  return http.delete<Result>(`${API_URL + Api.UserDelete}/${userId}`)
}

/** 根据用户名获取用户信息 */
export const GetUserInfoByUserName = (username: any) => {
  return http.get<Result>(`${API_URL + Api.GetUserInfoByUserName}/${username}`, undefined, { headers: { noLoading: true } })
}

/** 新增用户接口 */
export const userAdd = (data: User.AddUserRequestData) => {
  return http.post<Result>(API_URL + Api.UserAdd, data)
}
