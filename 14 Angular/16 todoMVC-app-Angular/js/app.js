/**
 * Created by Administrator on 2017/8/4.
 */
(function(angular){
    "use strict";
    // 1 创建模块
    var app = angular.module('todosApp', ['service']);
    // 2 创建控制器
    app.controller('todosController', [
        '$scope',
        '$location',
        '$log',
        'myService',
        function($scope, $location, $log, myService){
            // 2.1 功能1：任务展示
            $scope.todos = myService.get();
        /*    $scope.todos = [
                { id:1, name:"吃饭", completed: true },
                { id:2, name:"编程", completed: false },
                { id:3, name:"跑步", completed: false },
                { id:4, name:"喝水", completed: true },
                { id:5, name:"打牌", completed: true },
                { id:6, name:"打球", completed: false }
            ]; */


            // 2.2 功能2：添加任务
            $scope.newTodo = '';
            $scope.add = function( newTodo ){
                //首先判断newTodo的input框是否输入文本，如果没有直接return，ng-model双向数据绑定
                console.log(!!$scope.newTodo);
                if(!$scope.newTodo){ // 添加任务的input框没有输入直接return
                    return ;
                }
                //如果添加任务的input框有输入文本，表示要添加新任务
                myService.add($scope.newTodo);
                //添加新任务后，将添加任务的input框清空，利用双向数据绑定，只需要对newTodo清空即可实现
                $scope.newTodo = '';
            };

            // 2.3 功能3：删除任务
            //遍历查找需要删除的id号对应的item，然后利用数组splice方法删除，然后return结束remove方法
            $scope.remove = function( id ){
                myService.remove(id);
/*                for(var i=0; i<$scope.todos.length; i++){
                    if( $scope.todos[i].id == id ){
                        $scope.todos.splice(i, 1);
                        return;
                    }
                }*/

            };

            // 2.4 功能4： 修改任务
            // 假设可编辑修改任务的id为 -1
            $scope.isEditingId = -1;
            // 双击任务获取任务的id号，触发edit()方法，将isEditingId = id
            $scope.edit = function(id){
                $scope.isEditingId = id;
            };
            // 修改完后，按下键盘的enter键，要保存修改的数据，将isEditingId重新置-1
            $scope.save = function(){
                $scope.isEditingId = -1;
                myService.save();  //调用save()方法保存修改后的数据
            };

            // 2.5 功能5： 修改任务的状态，主要将completed属性修改为 $scope.todos[i].completed
            $scope.statusChange = function(){
                myService.save();
            };

            // 2.6 功能6： 批量修改任务的completed状态
            $scope.selectAll = false; //默认是false，不勾选
            //遍历所有任务的checkbox，将selectAll的checked属性值赋给所有任务的checkbox的checked属性
            $scope.toggleAll = function(){
                myService.toggleAll($scope.selectAll);
            };

            // 2.7 功能7： 显示未完成的任务数量
            $scope.getActive = function(){
                return myService.getActive();
            };

            // 2.8 功能8： 清除所有已经完成的任务
            $scope.clearAll = function(){
                myService.clearAll();
            };

            // 3 切换不同状态按钮来显示对应的任务，利用过滤器完成
            $scope.isCompleted = {}; // filter过滤器的过滤条件
            // 3.1 active按钮：显示未完成的任务
            $scope.active = function(){
                $scope.isCompleted = { completed: false };
            };
            // 3.2 completed按钮：显示已完成的任务
            $scope.completed = function(){
                $scope.isCompleted = { completed: true };
            };
            // 3.3 All按钮：显示所有的任务
            $scope.all = function(){
                $scope.isCompleted = {};
            };

            // 4 根据不同的url锚点值来切换不同状态的任务显示，利用$watch监视锚点变化
            //注意$watch监视的必须是$scope的属性或方法，而不能是普通的变量或方法
            //因此需要将angular对象上的location方法挂载成为一个$scope的属性
            $scope.loca = $location;
            $scope.$watch('$loca.url()', function(now, old){
                switch(now) {
                    case '/active':
                        $scope.isCompleted = { completed: false };
                        break;
                    case '/completed':
                        $scope.isCompleted = { completed: true };
                        break;
                    default:
                        $scope.isCompleted = {};
                        break;
                }
            });

        }
    ]);

})(angular);







