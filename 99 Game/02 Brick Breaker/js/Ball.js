/**
 * 小球类
 */
(function () {
    window.Ball = Class.extend({
        init: function () {
            this.w = 27; // 小球宽高相等，都等于小球的直径
            this.h = 27;
            this.r = this.w / 2;   // 13.5 （或者this.h/2）
            this.x = 400; // 默认在（400， 100）的位置，注意：这里的this.x, this.y是小球所在正方形的左上角的顶点的坐标，而不是小球球心的坐标
            this.y = 100;
            this.angle = -30;
            this.speed = 6;

        },
        update: function () {
            // 如果当前游戏的状态是0，那么小球黏在挡板上，游戏还没有开始
            // 如果当前游戏的状态是1，那么小球飞出去，游戏立刻开始
            if (game.gameState == 0) {
                this.x = game.racket.x + game.racket.w / 2 - this.w / 2;
                this.y = game.racket.y - this.h;
            } else if (game.gameState == 1) {
                this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
                this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
                // 判断小球是否撞到画布的左右边界
                if ((this.x + this.w) > game.canvas.width || this.x  < 0) {
                    // 此时小球撞击了canvas的右边界 && 左边界
                    this.angle = 180 - this.angle;
                }
                // 判断小球是否撞到画布的顶边界（注意不需要判断撞击画布底边界，因为导致游戏结束）
                if (this.y < 0) {
                    // 此时小球撞击了canvas的顶边界
                    this.angle = 360 - this.angle;
                }
                // 判断小球是否撞到挡板的上边界（注意不需要判断撞击挡板的左、右、底边界，因为导致游戏结束）
                if ((this.x + this.r) > game.racket.x && (this.x + this.r)  < (game.racket.x + game.racket.w)) {
                    if ((this.y + this.h) > game.racket.y) {
                        // 此时小球撞击了canvas的顶边界
                        this.angle = 360 - this.angle;
                    }
                }

                // 判断游戏结束，重新开始，以-30发球
                if (this.y > game.racket.y) {
                    game.gameState = 0;
                    game.ball.angle = -30;
                }


            }

        },
        // 在game类的mainloop里面，每帧都执行
        render: function () {
            // game.ctx.drawImage(game.images.ball, 0, 0);
            game.ctx.drawImage(game.images.ball, this.x, this.y);
        }
    });


})();