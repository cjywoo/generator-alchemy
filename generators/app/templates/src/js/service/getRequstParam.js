/**
 * @desc 获取url内或者coockie内的参数
 * @author	zjfh-chenjy
 * @param
 * @version	1.0.00.0
 */


angular.module('myApp')
  .factory('getRequstParam', function() {
    function getRequestParameters() {
      var arr = (location.hash || "").replace(/#(.*)\?/,'').split("&");
      var params = {};
      for (var i = 0; i < arr.length; i++) {
        var data = arr[i].split("=");
        if (data.length == 2) {
          params[data[0]] = data[1];
        }
      }
      return params;
    }

    function getCookies(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        var result = unescape(arr[2]);
        result = result.replace(/^\"|\"$/g, "").replace(/\\\"/g, "\"");
        try {
          return JSON.parse(result);
        } catch (e) {}
        return result;
      } else {
        return "";
      }
    }

    return {
      toJSON: function(keys) {
        var param = getRequestParameters();
        for (var i=0;i<keys.length;i++) {
          if (!param[keys[i]]) {
            param[keys[i]] = getCookies(keys[i]);
          }
        }
        console.log(param);
        return param;
      }
    };

  });
