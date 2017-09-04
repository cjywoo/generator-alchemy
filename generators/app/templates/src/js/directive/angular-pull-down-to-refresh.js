/**
 * Created by Yurii Kovalenko c12o16h1@gmail.com on 11/29/15.
 */
(function (window, document, undefined) {
    'use strict';
    angular.module('pullDownToRefresh', []).constant('pullDownToRefreshConfig', {
        treshold: 60,
        debounce: 400,
        text: {
            pull: '',
            ready: '',
            loading: '',
            hide: ''
        },
        scrollTopClass:'sun-page-scroll',
        icon: {
            pull: 'sun-icon-ewallet',
            ready: 'sun-icon-ewallet',
            loading: 'sun-icon-loading',
            hide: 'sun-icon-ewallet'
        }
    }).directive('pullDownToRefresh', [
        '$compile',
        '$timeout',
        '$q',
        'pullDownToRefreshConfig',
        function ($compile, $timeout, $q, pullDownToRefreshConfig) {
            return {
                scope: true,
                restrict: 'A',
                transclude: true,
                templateUrl: 'angular-pull-down-to-refresh.tpl.html',
                compile: function compile(tElement, tAttrs, transclude) {
                    return function postLink(scope, iElement, iAttrs) {
                        var config = angular.extend({}, pullDownToRefreshConfig, iAttrs);
                        var targetEl = window.ptr = iElement.children()[0];
                        var startPosY;
                        scope.text = config.text;
                        scope.icon = config.icon;
                        scope.status = 'pull';
                        var shouldReload = false;
                        var setStatus = function (status) {
                            shouldReload = status === 'ready';
                            scope.$apply(function () {
                                scope.status = status;
                            });
                        };
                        iElement.bind('touchstart', function (e) {
                            startPosY = e.touches[0].clientY;
                        });
                        iElement.bind('touchmove', function (e) {
                          var curPosY = e.touches[0].clientY - startPosY;
                          if(document.getElementsByClassName(config.scrollTopClass)[0].scrollTop>0 || curPosY<0){
                            setStatus('scroll');
                          }else{
                            targetEl.style.webkitTransitionDuration = 0;
                            targetEl.style.margin = '10px auto';

                            if (curPosY > config.treshold && !shouldReload) {
                                setStatus('ready');
                            } else if (curPosY < config.treshold && shouldReload) {
                                setStatus('pull');
                            }
                          }
                        });
                        iElement.bind('touchend', function (e) {
                            if (!shouldReload){
                                targetEl.style.webkitTransitionDuration = 0;
                                targetEl.style.margin = '-40px auto 0';
                                return;
                            }else if(shouldReload!=='scroll'){
                              setStatus('loading');
                              var start = +new Date();
                              $q.when(scope.$eval(iAttrs.pullDownToRefresh)).then(function () {
                                  var elapsed = +new Date() - start;
                                  $timeout(function () {
                                      targetEl.style.margin = '';
                                      targetEl.style.webkitTransitionDuration = '';
                                      scope.status = 'hide';
                                  }, elapsed < config.debounce ? config.debounce - elapsed : 0);
                              });
                            }
                        });
                        scope.$on('$destroy', function () {
                            iElement.unbind('touchmove');
                            iElement.unbind('touchend');
                            iElement.unbind('touchstart');
                        });
                    };
                }
            };
        }
    ]);
    angular.module('pullDownToRefresh').run([
        '$templateCache',
        function ($templateCache) {
            $templateCache.put('angular-pull-down-to-refresh.tpl.html', '<div class=\'pull-down-to-refresh\'>\n' + '  <i ng-class=\'icon[status]\'></i>&nbsp;\n' + '  <span ng-bind=\'text[status]\'></span>\n' + '</div>\n' + '<div ng-transclude></div>\n');
        }
    ]);
}(window, document));
