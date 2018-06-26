/**
 * Created by Administrator on 2017/8/4.
 */
(function (angular) {
    "use strict";
    // 1 创建模块：服务service模块
    var app = angular.module('service', []);
    // 2 创建service服务
    app.service('myService', ['$window', function ($window) {
        console.log($window === window); //$window和全局的window是同一个
        //var str = $window.localStorage.getItem('mytodos') || '[]';
        console.log($window.localStorage.getItem('mytodos'));
        var str;
        if (!$window.localStorage.getItem('mytodos')) {
            str = '[]';
        } else {
            str = $window.localStorage.getItem('mytodos')
        }
        //假设已经获取后台数据（用本地缓存模拟后台获取数据）
        var todos = JSON.parse(str);
        // 2.1 返回任务数据
        this.get = function () {
            return todos;
        };

        // 封装save方法，保存数据到localStorage中
        this.save = function () {
            var str = JSON.stringify(todos);
            $window.localStorage.setItem('mytodos', str);
        };

        // 2.2 功能： 添加数据
        this.add = function (newTodo) {
            //把新数据添加到$scope.todos中
            todos.push({
                id: Math.random(),
                name: newTodo,
                completed: false
            });
            this.save();
        };

        // 2.3 功能： 删除任务
        this.remove = function (id) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id == id) {
                    todos.splice(i, 1);
                    this.save();
                    return;
                }
            }
        };

        // 2.4 功能： 批量切换任务状态
        this.toggleAll = function (selectAll) {
            for (var i = 0; i < todos.length; i++) {
                todos[i].completed = selectAll;
            }
            this.save();
        };

        // 2.5 功能7： 未完成的任务显示
        this.getActive = function () {
            var count = 0;
            for (var i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    count++;
                }
            }
            return count;
        };

        // 2.6 功能： 删除所有已经完成的任务
        this.clearAll = function () {
            for (var i = todos.length - 1; i >= 0; i--) {
                if (todos[i].completed) {
                    todos.splice(i, 1);
                }
            }
            this.save();
        };

    }]);

})(angular);