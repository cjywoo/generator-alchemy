
/**
 * @desc ajax回调成功的函数
 * @author	zjfh-chenjy
 * @param  res : ajax返回data
 *         versionLocal : 本地的版本号
 *         versionRes : ajax返回版本号
 *         reloadCB : 数据更新的回调函数
 *         errorCB : 返回报错的回调函数
 * @version	1.0.00.0
 */


angular.module('myApp')
.factory('parseRes', function() {
  return {
    tocode: function(res,reloadCB,errorCB,versionLocal,versionRes) {
      var resData = res.data.response;
      if("00000" === res.data.hostRspCode &&　("00000" ===resData.ajaxRetCode || "00000" ===resData.comRetCode) ){
        if(!versionLocal || !versionRes || versionLocal != versionRes){
          return reloadCB(resData);
        }
      }else{
        // 后台返回失败
        return errorCB(resData);
      }
    }
  };

});
