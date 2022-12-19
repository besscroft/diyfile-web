import { API_URL } from '../../../config/config'
import type { Login, PageResultData, ReqPage, ResultData } from '~/api/interface'
import http from '~/api'

/**
 * @name 登录模块
 */
enum Api {
  Login = '/user/login',
  GetUserInfo = '/user/info',
  LoginOut = '/user/loginOut',
  UserPage = '/user/userPage',
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
  return http.post<ResultData>(API_URL + Api.LoginOut)
}

/** 用户分页列表 */
export const userPage = (params: ReqPage) => {
  return http.get<PageResultData>(API_URL + Api.UserPage, params)
}
