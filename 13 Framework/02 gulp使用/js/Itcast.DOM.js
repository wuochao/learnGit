(function (window) {
    // 注意: 由于核心模块应该首先执行, 因此在这里 Itcast 构造函数, I 函数等可以直接使用
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    var Itcast = window.Itcast,
        I = Itcast;

    // DOM处理： parseHTML
    function parseHTML(htmlStr) {
        var i;
        var rest = [];
        var div = document.createElement('div');
        div.innerHTML = htmlStr;
        for (i = 0; i < div.childNodes.length; i++) {
            rest.push(div.childNodes[i]);
        }
        return rest;
    }

    //挂载到Itcast的静态方法parseHTML上
    Itcast.parseHTML = parseHTML;

    // appendTo方法
    Itcast.fn.extend({
        appendTo: function (selector) {
            var iObj = Itcast(selector); //转换成Itcast对象
            var iNewObj = Itcast(); //转换成一个空的新的Itcast对象
            var rest = [];
            var temp;
            this.each(function () {
                for (var i = 0; i < iObj.length; i++) {
                    temp = i == iObj.length - 1 ? this : this.cloneNode(true);
                    iObj[i].appendChild(temp);
                    rest.push(temp);
                }
            });
            push.apply(iNewObj, rest);
            return this.pushStack(iNewObj);
        },
        append: function () {
            // ......
        },
        unique: function( iObj ){
            var temp = [];
            var newIObj = Itcast();
            for(var i=0; i<iObj.length; i++){
                if( temp.indexOf( iObj[i]) == -1 ){
                    temp.push( iObj[i] );
                }
            }
            push.apply( newIObj, temp);
            return newIObj;
        },
        parent: function(){
            var iObj = Itcast();
            push.apply( iObj, this.map(function( item ){
                return item.parentNode;
            }));
            // 去除重复元素
            iObj = Itcast.unique( iObj );
            return this.pushStack( iObj );
        }

    });


})(window);








