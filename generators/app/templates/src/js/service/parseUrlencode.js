
/**
 * @desc 将json数据转化为urlencode格式
 * @author	zjfh-chenjy
 * @param {json} 转化的json数据
 * @version	1.0.00.0
 */


angular.module('myApp')
.factory('parseUrlencode', function() {
  return {
    tocode: function(json) {
      var str = '';
      for(var key in json){
        var param;
        if (json[key] instanceof Object) {
          param=JSON.stringify(json[key]);
        }else {
          param=json[key];
        }
        str+=key+'='+param+'&';
      }
      return str.substr(0,str.length-1);
    }
  };
});
