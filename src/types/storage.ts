export interface Storage {
  /** 存储 id */
  id: number

  /** 存储名称 */
  name: string

  /** 存储 key */
  storageKey: string

  /** 存储类型 */
  type: number

  /** 存储启用状态：0->禁用；1->启用 */
  enable: number

  /** 备注 */
  remark: string

  /** 创建者 */
  creator: number

  /** 更新者 */
  updater: number

  /** 创建时间 */
  createTime: Date

  /** 更新时间 */
  updateTime: Date

  /** 逻辑删除：0->删除状态；1->可用状态 */
  del: number
}
