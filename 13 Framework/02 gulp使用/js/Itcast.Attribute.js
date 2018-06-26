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








