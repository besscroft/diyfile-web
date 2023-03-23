export namespace Sync {
  /** 同步任务添加参数 */
  export interface TaskAddParam {
    /** 同步前存储 key */
    beforeStorageKey: string | undefined
    /** 同步前存储路径 */
    beforePath: string | undefined
    /** 同步后存储 key */
    afterStorageKey: string | undefined
    /** 同步后存储路径 */
    afterPath: string | undefined
  }
}
