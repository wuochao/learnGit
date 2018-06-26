/**
 * JS仿淘宝详情页菜单条智能定位效果
 * constructor SmartFloat
 * @author tugenhua
 * @time 2014-1-15
 */

function SmartFloat(options) {
    this.config = {
        targetElem: '#nav'  // 要定位的dom节点
    };
    this.cache = {};
    this.init(options);
}

SmartFloat.prototype = {
    constructor: SmartFloat,
    init: function (options) {
        this.config = $.extend(this.config, options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;

        var top = $(_config.targetElem).offset().top,
            pos = $(_config.targetElem).css('position'),
            isIE6 = navigator.userAgent.match(/MSIE 6.0/) != null;

        $(window).scroll(function () {
            var winTop = $(this).scrollTop();
            if (winTop >= top) {

                if (!isIE6) {
                    $(_config.targetElem).css({
                        position: 'fixed',
                        top: 0
                    });
                } else {
                    $(_config.targetElem).css({
                        position: 'absolute',
                        top: winTop
                    });
                }
            } else {
                $(_config.targetElem).css({
                    position: pos,
                    top: top
                });
            }
        });
    }
};

// 页面初始化

$(function () {
    new SmartFloat({});
});