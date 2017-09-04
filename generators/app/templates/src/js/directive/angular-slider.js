/**
 * @desc 仿淘宝物流的slider
 * @author	zjfh-chenjy
 * @param {versionkey} 变量的版本字段
 * @param {datakey} 变量的数据缓存字段
 * @param {data} 需要使用缓存的变量引用
 * @version	1.0.00.0
 */
(function(window, document, undefined) {
  angular.module('slider2', [])
    .directive("slider2", function($timeout) {
      return {
        restrict: "EA",
        replace: true,
        scope: {
          images: "@"
        },
        template: '<li class="item" ng-repeat = "item in dataList" ng-show="$index == current">' +
          '<div class="left">' +
          '<div class="icon icon-circle-{{item.Country}}"></div>' +
          '</div>' +
          '<div class="right">' +
          '<h3 class="name" ng-bind="item.ApplySchoolName">准备中</h3>' +
          '<div class="state">' +
          ' <span class="icon icon-state-{{item.stateNow}}"></span>' +
          ' <span class="text" ng-bind="item.stateNow"></span>' +
          '</div>' +
          '<div class="progress-wrapper">' +
          '<ul class="progress-back">' +
          ' <li class="pro-item {{status.state}}" ng-repeat="status in item.ApplyStatus">' +
          '<div class="square"></div>' +
          '<h3 class="state"></h3>' +
          '</li>' +
          '</ul>' +
          '<div class="progress-all">' +
          '<div class="line" width="{{item.width}}" data-ng-init="load($index)"></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</li>',
        link: function(scope, element, attrs) {
          scope.current = 0;
          scope.totalNumber = scope.images.length;
          scope.next = function() {
            if (scope.current < scope.totalNumber - 1) {
              scope.current = scope.current + 1;
            } else {
              scope.current = 0;
            }
          };
          scope.prev = function() {
            if (scope.current > 0) {
              scope.current = scope.current - 1;
            } else {
              scope.current = scope.totalNumber - 1;
            }
          };
          //
          var timer = null;
          var autoPlay = function() {
            timer = $timeout(function() {
              scope.next();
              timer = $timeout(autoPlay, 1000 * 3);
            }, 1000 * 3);
          };
          //autoPlay();
          if (attrs.auto == "true") {
            autoPlay();
          }
          //
          scope.$on('$destroy', function() {
            $timeout.cancel(timer);
          });
        }
      };
    });

}(window, document));
