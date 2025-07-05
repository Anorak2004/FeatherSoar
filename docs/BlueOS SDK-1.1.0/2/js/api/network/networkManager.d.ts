/**
 * 网络状态
 * 接口声明: {"name": "blueos.network.networkManager"}
 */
declare module '@blueos.network.networkManager' {
  /**
   * @desc 获取网络类型
   * @param {obj} 获取网络类型入参 {object}
   * @version 1
   */
  const getType: (obj: {
    /**
     * @desc 成功回调
     * @param {data} 成功回调返回值 {object}
     */
    success?: (data: {
      /**
       * @desc 网络类型，可能的值为 2g，3g，4g，wifi，none， 5g()，bluetooth()，others()
       */
      type: string
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
   * 	@desc 监听网络连接状态。如果多次调用，仅最后一次调用生效
   *  @param {obj} 监听网络连接状态入参 {object}
   *  @version 1
   */
  const subscribe: (obj: {
    /**
     * 	@desc 是否持久化订阅，默认为false。机制：设置为true，页面跳转，不会自动取消订阅，需手动取消订阅
     */
    reserved?: boolean
    /**
     * @desc 每次网络发生变化，都会被回调
     * @param {data} 成功回调返回值 {object}
     */
    callback?: (data: {
      /**
       * @desc 网络类型，可能的值为 2g，3g，4g，wifi，none， 5g()，bluetooth()，others()
       */
      type: string
    }) => void
    /**
     *  @desc 失败回调，可能是因为缺乏权限
     * 	@param {data} 失败回调的返回值 {any}
     *	@param {code} 失败回调的返回状态码 {number}
     */
    fail?: (data: any, code: number) => void
  }) => void

  /**
   * @desc 取消监听网络连接状态
   */
  const unsubscribe: () => void


   /**
   * @desc 获取Sim卡的运营商信息，需要电话权限
   * @param {obj} 获取Sim卡的运营商信息入参 {object}
   * @deprecated 即将废弃，改用'@blueos.telephony.simManager.getSimOperators()'
   * @version 1
   * 
   */
   const getSimOperators: (obj: {
    /**
     * @desc 成功回调
     * @param {data} 成功回调返回值 {object}
     */
    success?: (data: {
      /**
       * @desc SIM卡列表信息
       */
      operators: Array<{
        /**
         * @desc 返回 Sim 卡的运营商信息 运营商信息说明：此处统一返回 MCC+MNC，即移动国家代码 + 移动网络代码；中国移动：46000，46002，46004，46007；中国联通：46001，46006，46009；中国电信：46003，46005，46011
         */
        operator: string
        /**
         * @desc 卡槽序号
         */
        slotIndex: number
      }>
      /**
       * @desc Sim卡数量
       */
      size: string
    }) => void
    /**
     *  @desc 失败回调，可能是因为缺乏权限
     * 	@param {data} 失败回调的返回值 {any}
     *	@param {code} 失败回调的返回状态码 {number}
     */
    fail?: (data: any, code: number) => void
    /**
     * @desc 执行结束后的回调
     */
    complete?: () => void
  }) => void

}
