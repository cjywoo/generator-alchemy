/**
 * @desc 数据的初始化函数
 * @author	zjfh-chenjy
 * @param {versionkey} 变量的版本字段
 * @param {datakey} 变量的数据缓存字段
 * @param {data} 需要使用缓存的变量引用
 * @version	1.0.00.0
 */


angular.module('myApp')
.factory('localLoad', ['cache',function(cache) {
  var localLoad = function(versionkey,datakey) {
    this.data = [];
    this.versionkey = versionkey;
    this.datakey = datakey;
  };
  localLoad.prototype.getData = function() {
    if(cache.get(this.versionkey) && cache.get(this.datakey)){
      this.data =  cache.get(this.datakey);
    }
    return this.data;
  };
  return localLoad;

}]);
