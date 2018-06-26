
<!-- 以后项目的根组件 -->
<template>
	<!-- 1.0 template主要是放html元素的（html的页面结构） -->
    <div>
        <span v-text="msg" class="red"></span>
        <button @click="add1(1,2)">add</button>
    </div>
</template>

<script>
    //按需导入
    import {add} from './calc.js';
    //负责导出.vue组件对象（本质上是一个vue对象，所以vue中该定义的元素都可以使用）
    // function add(x, y){ console.log(x+y); }
    // module.exports = {  //es5的导出对象的写法
    export default{
        data(){ //等价于 es5的 data:function(){
            return {
                msg: '这是vue组件的data里面的msg'
            }
        },
        methods: {
            // add,   // es6的写法  等价于es5 ： add:add
            // substract: substract
            add1: add
        },
        created(){

        }
    }
    
</script>

<style scoped>
    /*当前页面的css样式，其中scoped表示这个里面写的css代码，只是在当前组件页面上有效，不会去影响到其他组件页面*/
    .red {
        color: red;
    }

</style>
