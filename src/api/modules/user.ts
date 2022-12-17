import { API_URL } from '../../../config/config'
import type { Login, ResultData } from '~/api/interface/index'
import http from '~/api'

/**
 * @name 登录模块
 */
enum Api {
  Login = '/user/login',
  GetUserInfo = '/user/info',
  LoginOut = '/user/loginOut',
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
