/**
 * Created by Administrator on 2017/7/25.
 */
(function (window) {
    // 注意: 由于核心模块应该首先执行, 因此在这里 Itcast 构造函数, I 函数等可以直接使用
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    var Itcast = window.Itcast,
        I = Itcast;

    // 先实现on 和 off 方法，然后再实现其他方法
    Itcast.fn.extend({
        on: function( eventName, callback ){
            //遍历this，给每个dom元素都绑定事件
            return this.each(function(){
                this.addEventListener( eventName, callback );
            });
        },
        off: function( eventName, callback ){
            //遍历this，给每个dom元素都绑定事件
            return this.each(function(){
                this.removeEventListener( eventName, callback );
            });
        }
    });

    // 可以通过在页面创建div，并遍历div原型上的事件，来获取所有事件的名称
    var div = document.createElement( 'div' );
    var res = [];
    // 遍历div获取div原型上的所有事件方法的名称
    for( var k in div){
        if( k.slice(0,2) === 'on' ){
            res.push(k.slice(2));
        }
    }
    // 控制台打印出来所有的事件名称组成的数组res
    console.log( res );
    // 遍历res数组，并用 on 绑定事件处理的回调函数
    Itcast.each( res, function( index, item ){
        Itcast.fn[item] = function( callback ){
            return this.on( item, callback );
        };


    });



})(window);
























