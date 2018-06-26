/**
 * Created by Administrator on 2017/8/6.
 */
(function(angular){
    "use strict";
    // 封转一个 myJsonpService 模块
    // 1 创建模块
    var app = angular.module('myJsonpService', []);

    // 2 创建服务
    app.service('myService', ['$window', function($window){
        //封装自定义的jsonp函数
        this.jsonp = function(url, arg, fn){
            // 2.1 动态创建script标签
            var script = $window.document.createElement('script');

            // 2.2 设置src，遍历arg所有参数后拼接字符串
            var queryString = '';
            for(var k in arg){
                queryString += k + '=' + arg[k] + '&';
            }
            //funcName为了名字不重复（唯一）增加一个随机字符串
            var funcName = 'myJsonp' + Math.random().toString().substr(2);
            url += '?' + queryString + 'callback=' + funcName;
            script.src = url;

            // 2.3 添加到dom
            $window.document.body.appendChild(script);

            // 2.4 暴露给后台调用的函数funcName
            // data是后台传入的数据，fn是前端对从后台获取data的处理函数
            $window[funcName] = function(data){
                fn(data);
            };

        };
    }]);

})(angular);




