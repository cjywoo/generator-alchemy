/**
 * @desc localStorage的缓存管理
 * @author	zjfh-chenjy
 * @version	1.0.00.0
 */

angular.module('myApp')
.factory('cache', function() {
  return {
    put: function(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get: function(key) {
      var value = localStorage.getItem(key);
      if(value && value != "undefined"){
        return JSON.parse(value);
      }
      else{
        return false;
      }
    },
    remove: function(key) {
      return localStorage.removeItem(key);
    }
  };
});
