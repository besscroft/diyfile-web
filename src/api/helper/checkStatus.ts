/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      console.log('请求失败！请您稍后重试')
      break
    case 401:
      console.log('登录失效！请您重新登录')
      break
    case 403:
      console.log('当前账号无权限访问！')
      break
    case 404:
      console.log('你所访问的资源不存在！')
      break
    case 405:
      console.log('请求方式错误！请您稍后重试')
      break
    case 408:
      console.log('请求超时！请您稍后重试')
      break
    case 500:
      console.log('服务异常！')
      break
    case 502:
      console.log('网关错误！')
      break
    case 503:
      console.log('服务不可用！')
      break
    case 504:
      console.log('网关超时！')
      break
    default:
      console.log('请求失败！')
  }
}
