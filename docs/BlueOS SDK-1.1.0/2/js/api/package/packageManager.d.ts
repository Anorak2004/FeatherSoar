/**
 * 应用管理
 * 接口声明: {"name": "blueos.package.packageManager"}
 */
declare module '@blueos.package.packageManager' {
  /**
   * @desc 检测应用是否已安装。
   * @param {obj} 检测应用是否存在入参 {object}
   * @version 1
   */
  const hasInstalled: (obj: {
    /**
     * @desc 应用包名
     */
    package: string
    /**
     * @desc 成功回调
     * @param {data} 回调函数返回值 {object}
     */
    success?: (data: {
      /**
       * @desc 应用是否存在
       */
      result: boolean
    }) => void

    /**
     * 	@desc 失败的回调函数
     * 	@param {data} 失败回调的返回值 {any}
     *	@param {code} 失败回调的返回状态码 {number}
     */
    fail?: (data: any, code: number) => void
    /**
     * @desc 执行结束后的回调
     */
    complete?: () => void
  }) => void


  /**
   * @desc 获取应用版本号、版本名称信息。
   * @param {obj} 入参 {object}
   * @version 1
   */
  const getInfo: (obj: {
    /**
     * @desc 应用包名
     */
    package: string
    /**
     *  @desc 成功回调
     *  @param {data} 回调函数返回值 {object}
     */
    success?: (data: {
      /**
       *  @desc 应用包名
       */
      package: string
      /**
       *  @desc 应用名称
       */
      name: string
      /**
       *  @desc 应用图标路径
       */
      icon: string
      /**
       *  @desc 版本号
       */
      versionCode: number
      /**
       *  @desc 版本名称
       */
      versionName: string
    }) => void
    /**
     * 	@desc 失败的回调函数
     * 	@param {data} 失败回调的返回值 {any}
     *	@param {code} 失败回调的返回状态码 {number}
     */
    fail?: (data: any, code: number) => void
    /**
     * @desc 执行结束后的回调
     */
    complete?: () => void
  }) => void

  /**
   * @desc 异步获取应用分类，权限同同步 api。。
   * @param {obj} 异步获取应用分类，入参 {object}
   * @version 1
   */
  const getAppCategoryAsync: (obj: {
    /**
     * @desc 应用包名
     */
    package: string
    /**
     *  @desc 成功回调
     *  @param {data} 回调函数返回值 {object}
     */
    success?: (data: {
      /**
       * @desc 应用所属类别，详见上文应用分类
       */
      appCategory: string[]
    }) => void
    /**
     * 	@desc 失败的回调函数
     * 	@param {data} 失败回调的返回值 {any}
     *	@param {code} 失败回调的返回状态码 {number}
     */
    fail?: (data: any, code: number) => void
  }) => void
}
