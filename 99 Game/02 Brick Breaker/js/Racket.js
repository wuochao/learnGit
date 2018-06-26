/**
 * 小球的挡板类
 */
(function () {
    window.Racket = Class.extend({
        init: function () {
            this.w = 179;
            this.h = 37;
            // 挡板要位于屏幕的中间
            this.x = game.canvas.width / 2 - this.w / 2;  // 这里的90表示挡板宽度179的一半 89.5，近似90
            this.y = 500; // 写死，不变的高度，只能移动x （y不变）
            // 绑定监听鼠标的左右移动，相当于update
            this.bindListener();
        },
        render: function () {
            game.ctx.drawImage(game.images.racket, this.x, this.y);
        },
        // 绑定监听鼠标的左右移动方法
        bindListener: function () {
            var self = this; // 备份this
            game.canvas.addEventListener('mousemove', function (event) {
                self.x = event.offsetX;
                // 边界检测，不能超过右边界，也不能超过左边界
                if (self.x > game.canvas.width - self.w) {
                    self.x = game.canvas.width - self.w;
                }
                if (self.x < 0) {
                    self.x = 0;
                }
            });
            //鼠标按下事件监听
            game.canvas.addEventListener('mousedown', function (event) {
                //游戏状态的改变
                game.gameState = 1;
            });
        }
    });
})();