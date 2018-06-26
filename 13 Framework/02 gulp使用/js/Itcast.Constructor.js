
(function( window ){
	// 注意:由于核心模块应该首先执行, 因此在这里Itcast构造函数, I函数等可以直接使用
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


