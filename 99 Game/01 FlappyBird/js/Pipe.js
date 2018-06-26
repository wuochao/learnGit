(function (){
    window.Pipe = Class.extend({
        init: function (){
            this.type = _.random(0, 1); // 0表示管子向上，1表示管子向下
            this.w = 148;
            this.h = _.random(100, game.canvas.height/2);
            // 管子当前的位置
            this.x = game.canvas.width;
            this.y = this.type == 0? game.canvas.height -this.h - 44: 0;
            // 管子移动的速度
            this.speed = 3;
        },
        update: function (){
            this.x -= this.speed;
            // 超过屏幕的管子的要去掉
            if(this.x < -this.w){
                game.pipeArr = _.without(game.pipeArr, this);
            }

            // 碰撞检测
            if(game.bird.x + game.bird.w > this.x && game.bird.x < this.x + this.w){
                //此时小鸟进入到了this表示的这个管子的领空，开始进行碰撞检测
                if(this.type == 0){ // 管子的方向：向上
                    if(game.bird.y + game.bird.h >= this.y){
                        game.gameover();
                        return;
                    }
                } else if (this.type == 1){ // 管子的方向：向下
                    if(game.bird.y <= this.h){
                        game.gameover();
                        return;
                    }
                }
            }

            // 加分
            if(!this.done && this.x <game.canvas.width/2 -this.w){
                game.scoreManager.addScore();
                this.done = true;
            }

      },
        render: function (){
            if(this.type == 0){
                // 向上的管子
                game.ctx.drawImage(game.images.pipe0, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
            } else if (this.type == 1){
                // 向下的管子
                game.ctx.drawImage(game.images.pipe1, 0, 1664-this.h, this.w, this.h, this.x, this.y, this.w, this.h);
            }

        },
        pause : function (){
            this.speed = 0;
        }
    });
})();