/**
 * 独立砖块类：
 * 构造函数，row行号，col列号，color砖块的颜色
 * color的合法值为： 1， 2， 3， 4， 5 代表5种不同颜色的brick
 * row的合法值： 0 ~ 8 （根据放置在画布上的位置计算出最大row的值）
 * col的合法值： 0 ~ 7 （根据放置在画布上的位置计算出最大col的值）
 */
(function () {
    window.Brick = Class.extend({
        init: function (row, col, color) {
            this.row = row;
            this.col = col;
            this.color = color;
            this.w = 94;
            this.h = 36;
            this.x = 100 + this.col * 99;  //包含砖块间横向间隙
            this.y = 50  + this.row * 40;  //包含砖块间纵向间隙
        },
        update: function () {
            // 碰撞检测思路：每个砖块自己有没有被小球撞到，如果撞到了，就把brickManager矩阵对应的位置改成null
            // 如果小球在砖块的左边界与右边界的中间区域撞击砖块的上下面
            if ((game.ball.x + game.ball.r)> this.x && (game.ball.x + game.ball.r)< (this.x + this.w)) {
                //  如果小球在砖块的上面、或者下面撞击砖块，那么把brickManager里面的bricks矩阵的[r][c]改成null，并改变反射角度= 360° - 入射角度
                if(game.ball.y < (this.y + this.h) && (game.ball.y + game.ball.h) < (this.y + this.h)){ // 撞到挡板的底边
                    game.brickManager.bricks[this.row][this.col] = null;
                    game.ball.angle = 360 - game.ball.angle;
                }
                if((game.ball.y + game.ball.h) > this.y && game.ball.y  < this.y ){                     // 撞到挡板的顶边
                    game.brickManager.bricks[this.row][this.col] = null;
                    game.ball.angle = 360 - game.ball.angle;
                }
            }


            // 如果小球在砖块的上边界与下边界的中间区域撞击砖块的左右侧面
            if ((game.ball.y + game.ball.r) > this.y && (game.ball.y + game.ball.r) < (this.y + this.h)) {
                // 如果小球在砖块的左侧、或者右侧撞击砖块，那么把brickManager里面的bricks矩阵的[r][c]改成null，并改变反射角度= 180° - 入射角度
                if ((game.ball.x + game.ball.r) > this.x && game.ball.x < this.x) {
                    // 撞到挡板的左边
                    game.brickManager.bricks[this.row][this.col] = null;
                    game.ball.angle = 180 - game.ball.angle;
                }
                if ((game.ball.x + game.ball.r) > (this.x + this.w) && game.ball.x < (this.x + this.w)) {
                    // 撞到挡板的右边
                    game.brickManager.bricks[this.row][this.col] = null;
                    game.ball.angle = 180 - game.ball.angle;
                }
            }
        },
        render: function () {
            game.ctx.drawImage(game.images.brick, (this.color - 1) * 97, 0, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    });
})();