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








