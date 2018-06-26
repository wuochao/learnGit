/**
 * Created by Administrator on 2017/8/4.
 */
(function(angular){
    "use strict";
    var app = angular.module('main', [
        'home',
        'details',  // 路由规则：先引用，先匹配
        'movie_list',
        'auto-active'
    ]);
})(angular);



