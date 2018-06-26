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