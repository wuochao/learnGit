/**
 * Created by Administrator on 2017/8/4.
 */
(function(angular){
    "use strict";
    // 1 创建模块
    var app = angular.module('movie_list', ['ngRoute', 'myJsonpService']);
    // 2 配置路由
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/:movieType/:page?',{   // 形式： #/movie_list
            templateUrl: 'movie_list/movie_list.html',
            controller: 'movie_listController'
        });
    }]);
    // 3 创建控制器
    app.controller('movie_listController', [
        '$scope',
        '$http',   //专门用来发送请求
        '$routeParams',
        '$route',
        'myService',
        function($scope, $http, $routeParams, $route, myService) {
            $scope.loading = true;  // 显示加载动画
            console.log($routeParams);  //打印出路由参数看看，有哪些信息
            // 假设已经得到了数据，约定每页显示5条数据
            $scope.pageSize = 5;
            $scope.page = ($routeParams.page || '1') - 0; // 或“1”表示默认是第1页， 减0表示将字符串转换成数值类型
            // page : 1    0,  1,  2,  3,  4
            // page : 2    5,  6,  7,  8,  9
            // page : 3    10, 11, 12, 13, 14
            var start = ($scope.page - 1) * $scope.pageSize; //第几条开始
            myService.jsonp('http://api.douban.com/v2/movie/' + $routeParams.movieType, {
                start: start,
                count: $scope.pageSize,
                keyword: $routeParams.keyword
            }, function (data) {
                //请求成功后的回调函数
                $scope.data = data;  //在异步给数据模型赋值，angular不会知道，所以后面需要用$apply()来告知angular要重新渲染页面
                // 根据总条数 和  每页显示数据数量 计算出总页数
                $scope.totalPage = Math.ceil($scope.data.total / $scope.pageSize);
                $scope.loading = false; //让加载动画消失
                console.log($scope.loading);
                // 告知angular要重新渲染页面，$scope.$apply()会把$scope的属性值重新渲染到页面
                $scope.$apply();
            });

            // 获取指定页的数据
            $scope.getPage = function (nowPage) {
                //当前页面小于等于1时，或者 当前页面大于等于总页数时，不允许跳转到上一页、下一页
                if (nowPage <= 0 || nowPage > $scope.totalPage) {
                    return;
                }
                // 改变url中的锚点值，myService.json方法会改变url中锚点的参数
                $route.updateParams({page: nowPage});
            };
        }
    ]);

})(angular);






