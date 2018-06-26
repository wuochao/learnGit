/**
 * Created by Administrator on 2017/8/6.
 */
(function(angular){
    "use strict";
    // 1 创建模块
    var app = angular.module('auto-active', []);

    // 2 创建自定义指令
    app.directive('autoActive', ['$location', function($location){
        return {
            link: function(scope, element, attributes){
                element.on('click', function(){
                    // 给当前元素的兄弟元素都清除active样式
                    element.parent().children().removeClass('active');
                    // 给当前元素添加active样式
                    element.addClass('active');
                });

                scope.loca = $location;
                // 监视锚点值的变化
                scope.$watch('loca.url()', function(now, old){
                    var hash = element.find('a').attr('href').substr(1);
                    console.log( now + '===>' + hash );
                    // startsWith表示一个字符是否以另一个字符开始
                    if(now.startsWith(hash)){
                        // 给当前元素的兄弟元素都清除active样式
                        element.parent().children().removeClass('active');
                        // 给当前元素添加active样式
                        element.addClass('active');
                    }
                });
            }
        };
    }]);

})(angular);




