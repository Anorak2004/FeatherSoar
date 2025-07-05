/**
 * 页面路由
 * 接口声明: 无需声明
 */
declare module '@blueos.app.appmanager.router' {
  /**
   * @desc 跳转到应用内的某个页面
   * @param {obj} 路由跳转的参数 {object}
   * @version 1
   *
   */
  const push: (obj: {
    /**
     * @desc 要跳转到的 uri,包含 schema 的完整 uri；目前支持的 schema 有 tel，sms 和 mailto，例如 tel:10086。以‘/’开头的应用内页面的路径；例：/about。以非‘/’开头的应用内页面的名称;例：About。
     */
    uri: string

    /**
     * @desc 跳转时需要传递的数据，参数可以在页面中通过this.param1的方式使用，param1 为 json 中的参数名，param1 对应的值会统一转换为 String 类型 {@link '@blueos.media.audio.audioManager'}
     */
    params?: Record<string, string>
    /**
     * @desc 设置当前跳转的转场动画
     */
    transition?: {
      /**
       * @desc 路由进入页面时的动效
       */
      forward?: {
        /**
         * @desc 即将退出的页面动画 {@link TransitionAnimation}
         */
        exit?: string
        /**
         * @desc 即将出现的页面动画 {@link TransitionAnimation}
         */
        enter?: string
      },
      /**
       * @desc 路由返回页面时的动效
       */
      back?: {
        /**
         * @desc 即将退出的页面动画 {@link TransitionAnimation}
         */
        exit?: string
        /**
         * @desc 即将出现的页面动画 {@link TransitionAnimation}
         */
        enter?: string
      }
    }
  }) => void

  /**
   * @desc 跳转到应用内的某个页面，当前页面无法返回
   * @param {obj} 路由跳转的参数 {object}
   * @version 1
   *
   */
  const replace: (obj: {
    /**
     * @desc 要跳转到的 uri,以"/"开头的应用内页面的路径；例：/about。以非"/"开头的应用内页面的名称;例：About。特殊的,如果 uri 的值是"/",则跳转到 path 为"/"的页,没有则跳转到首页
     */
    uri: string

    /**
     * @desc 跳转时需要传递的数据，参数可以在页面中通过this.param1的方式使用，param1 为 json 中的参数名，param1 对应的值会统一转换为 String 类型
     */
    params?: Record<string, string>
  }) => void

  /**
   * @desc 返回指定页面
   * @param {obj} 路由返回参数 {object}
   * @version 1
   */
  const back: (obj: {
    /**
     * @desc 返回目标页面的路径,不传该参数，返回上一页面,以"/"开头的应用内已打开页面的路径；例：/about。特殊的,如果 path 的值是"/",则跳转到页面名称为"/"的页,没有则跳转到首页
     */
    path?: string
  }) => void

  /**
   * @desc 清空所有历史页面记录，仅保留当前页面
   * @version 1
   */
  const clear: () => void

  /**
   * @desc 获取当前页面状态
   * @version 1
   * @returns 路由状态信息 {object}
   */
  const getState: () => {
    /**
     * @desc 当前页面在页面栈中的位置
     */
    index: number

    /**
     * @desc 当前页面的名称
     */
    name: string

    /**
     * @desc 当前页面的路径
     */
    path: string
  }

  /**
   * @desc 设置应用默认转场动画
   */
  const setTransition: (obj: {
    /**
     * @desc 路由进入页面时的动效
     */
    forward?: {
      /**
       * @desc 即将退出的页面动画 {@link TransitionAnimation}
       */
      exit?: string
      /**
       * @desc 即将出现的页面动画 {@link TransitionAnimation}
       */
      enter?: string
    },
    /**
     * @desc 路由返回页面时的动效
     */
    back?: {
      /**
       * @desc 即将退出的页面动画 {@link TransitionAnimation}
       */
      exit?: string
      /**
       * @desc 即将出现的页面动画 {@link TransitionAnimation}
       */
      enter?: string
    }
  }) => void
}
