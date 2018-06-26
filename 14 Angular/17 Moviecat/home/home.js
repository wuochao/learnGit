/**
 * Created by Administrator on 2017/8/4.
 */
(function(angular){
    "use strict";
    // 1 创建模块
    var app = angular.module('home', ['ngRoute']);
    // 2 配置路由
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            redirectTo: '/home_page'
        }).when('/home_page',{
            templateUrl: 'home/home.html',
            controller: 'homeController'
        });
    }]);
    // 3 创建控制器
    app.controller('homeController', ['$scope', function($scope){
        //...
    }]);

})(angular);

