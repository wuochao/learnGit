(function( window ){

    // Itcast的核心模块Core
    var arr = [],
    	push = arr.push,
    	slice = arr.slice;

    //定义Itcast工厂函数
    function Itcast ( selector ){
        return new Itcast.fn.init( selector );
    }

    //给Itcast的原型上添加方法
    Itcast.fn = Itcast.prototype = {
        constructor: Itcast,
        // 默认 length属性为 0，遍历空对象（当作伪数组）时，可以用for循环，而不是for-in循环
        length: 0,  

        each: function( callback ){
            //将this作为数组，遍历，使用callback
            return Itcast.each( this, callback );
        },
        map: function( callback ){
            return Itcast.map( this, callback );
        },
        toArray: function(){
            return slice.call( this );
        },
        get: function( index ){
            if( index === undefined ){
                // 没有传入参数时，返回整个数组
                return this.toArray();
            } else {
                // 传入参数，根据参数值返回对应的数组元素
                if( index >= 0 ){
                    return this[ index ];
                } else if( index < 0 ){
                    return this[ index + this.length ];
                }
            }
            //如果传入的不是 正数、负数，也没有传参，保证链式编程，返回this
            return this;
        },
        pushStack: function( newObj ){
            newObj.prevObj = this;
            return newObj;
        },
        end: function(){
            return this.prevObj || this;
        }

    };

    Itcast.select = function ( selector ) {
    	return document.querySelectorAll( selector );
    };

    Itcast.isArrayLike = function( array ) {
    	var length = array && array.length;
    	return typeof length === 'number' && length >= 0;
    };

    Itcast.each = function ( array, callback ) {
    	var i, k;
    	if( Itcast.isArrayLike( array )){
    		//如果是数组 或 伪数组，那么用for遍历
    		for( i = 0; i< array.length; i++){
    			if( callback.call( array[i], i, array[i] ) === false )
    				break;
    		}
    	} else {
    		//如果不是数组 或 伪数组，那么用for...in遍历
    		for( k in array ){
    			if( callback.call( array[k], k, array[k] ) === false )
    				break;
    		}
    	}
    	return array;
    };

    Itcast.map = function ( array, callback ) {
    	var i, k, temp;
    	var res = [];
    	if( Itcast.isArrayLike( array )){
    		//如果是数组 或 伪数组，那么用for遍历
    		for( i = 0; i< array.length; i++){
    			temp = callback( array[i], i );
    			if( temp !== undefined ) {
    				res.push( temp );
    			}	
    		}
    	} else {
    		//如果不是数组 或 伪数组，那么用for...in遍历
    		for( k in array) {
    			temp = callback( array[k], k );
    			if( temp !== undefined ) {
    				res.push( temp );
    			}
    		}
    	}
    	return res;
    };

    console.dir(Itcast.fn)

    Itcast.extend = Itcast.fn.extend = function( obj ){
    	for( var k in obj ){
    		this[ k ] = obj[ k ];
    	}
    };

    // 在全局范围内，引入2个变量
    window.Itcast = window.I = Itcast;


})( window );

(function( window ){
	/* 注意:由于核心模块应该首先执行, 因此在这里Itcast构造函数, I函数等可以直接使用*/
	var arr = [],
		push = arr.push,
		slice = arr.slice;
	var Itcast = window.Itcast,
		I = Itcast;

    //给Itcast的原型上添加自定义属性type，以便判断当前对象的类型
    Itcast.fn.type = 'Itcast';

	var init = Itcast.fn.init = function( selector ){
		// 需要判断，根据传入的数据不同而实现不同的功能
		// 处理null、undefined、""、false等情况
		if( !selector )
			return this;

        // 处理字符串：选择器 和 html格式的字符串
		if( typeof selector == 'string'){
			// 判断是选择器，还是 html 字符串
			if( selector.charAt(0) == '<' && selector.charAt( selector.length - 1) == '>' ) {
				// HTML 标签
				push.apply( this, Itcast.parseHTML(selector) );
				return this;
			} else {
                // 选择器
				push.apply( this, Itcast.select( selector ) );
				return this;
			}
		}
	};


    // 处理DOM元素：利用nodeType判断是否传入的参数为DOM对象
    if( selector.nodeType ){
        this[0] = selector;
        this.length = 1;
        return this;
    }

    // 处理 Itcast，有2种方法：
    // 方法一： 使用 constructor，即 selector.constructor == Itcast判断传入是否为Itcast对象
    // 方法二： 给Itcast原型上添加自定义属性type，即： Itcast.fn.type = 'Itcast';【推荐使用】
    if( selector.type == 'Itcast' ){
        // 将传入Itcast对象的每个元素都依次添加到 this 中，构成一个新对象
        push.apply( this, selector );
        return this;
    }

    // 处理函数，相当于添加load事件
    if( typeof selector == 'function' ){
        // 当传入的是函数时，相当于onload事件（相当于，但不是onload）
        window.addEventListener( 'load', selector );
    }

	init.prototype = Itcast.fn;

})( window );



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




(function (window) {
    // 注意: 由于核心模块应该首先执行, 因此在这里 Itcast 构造函数, I 函数等可以直接使用
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    var Itcast = window.Itcast,
        I = Itcast;

    Itcast.fn.extend({
        css: function (name, value) {
            if (value == undefined) {
                //没有传递第2个参数，表示获取属性name的属性值
                if (typeof name === 'string') {
                    // 获取name属性对应的样式值，this[0].currentStyle(name)兼容IE6-8
                    return this[0].style[name] || window.getComputedStyle(this[0])[name] || this[0].currentStyle(name);
                } else {
                    // 没有value且name不是字符串，那么传入的是对象形式，表示设置多个样式
                    return this.each(function () { //this：表示伪数组
                        var that = this;         //this：伪数组中的每个元素
                        Itcast.each(name, function (k, v) {
                            that.style[k] = v;
                        });
                    });
                }
            } else {
                // 有value 则说明是单个样式设置
                return this.each(function () {
                    this.style[name] = value;
                });
            }
        },
        addClass: function (name) {
            return this.each(function () { // 去除重复的 class类名
                if (this.className) {
                    //利用indexOf查找，没有找到返回-1，添加这个类名
                    this.className = ' ' + this.className + ' ';
                    if (this.className.indexOf(' ' + name + ' ') == -1) {
                        this.className += name;
                        this.className.slice(1); //去除第1个字符的空格
                    }
                } else {
                    this.className = name;
                }
            });
        },
        removeClass: function (name) {
            //将this中的className属性 与 name 同名的样式去掉
            return this.each(function () {
                var names = this.className && this.className.split(' ') || [];
                var newNames = names.filter(function (item, index) {
                    return item !== name;
                });
                this.className = newNames.join(' ');
            });

        },
        hasClass: function (name) {
            var dom = this[0];
            var names = dom.className && dom.className.split(' ') || [];
            return names.some(function (item) {
                return item === name;
            });
        },
        toggleClass: function (name) {
            return this.each(function () {
                // this是dom元素，不能调用Itcast的方法，要转换成Itcast对象
                var iObj = Itcast(this);
                if (iObj.hasClass(name)) {
                    iObj.removeClass(name);
                } else {
                    iObj.addClass(name);
                }
            });
        }
    });

})(window);









(function (window) {
    // 注意: 由于核心模块应该首先执行, 因此在这里 Itcast 构造函数, I 函数等可以直接使用
    var arr = [],
        push = arr.push,
        slice = arr.slice;
    var Itcast = window.Itcast,
        I = Itcast;

    Itcast.fn.extend({
        attr: function (name, value) {
            if (value === undefined) {
                return this[0].getAttribute(name);
            } else {
                return this.each(function () {
                    this.setAttribute(name, value);
                });
            }
        },
        prop: function (name, value) {
            if (value === undefined) {
                return this[0][name];
            } else {
                return this.each(function () {
                    this[name] = value;
                });
            }
        }
    });

    Itcast.each({
        html: 'innerHTML',
        text: 'innerText',
        val: 'value'
    }, function (k, v) {
        Itcast.fn[k] = function (value) {
            if (value === undefined) {
                return this[0][v];
            } else {
                return this.each(function () {
                    this[v] = value;
                });
            }
        }
    });


})(window);








