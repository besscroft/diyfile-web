/* UserStore */
export interface UserStore {
  /** token */
  token: string
  /** token 前缀 */
  tokenHead: string
  /** 刷新 token */
  refreshToken: string
  /** 用户名称 */
  userName: string
  /** 头像 */
  avatar: string
  /** i18n 语言 */
  language: string
  /** 暗黑模式 */
  theme: string
  /** 网站标题 */
  title: string
  /** 备案信息 */
  beian: string
}
