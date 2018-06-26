/**
 * 鸟类：
 */
(function (){
    window.Bird = Class.extend({
        init: function (){
            // this.x和this.y表示小鸟在屏幕中渲染的位置：在屏幕中央
            this.x = (game.canvas.width - 85)/2;
            this.y = 100;
            // this.w, this.h 小鸟自己的宽高
            this.w = 85;
            this.h = 60;
            // 翅膀的形态：合法值0、1、2
            this.swing = 0;
            // 鸟掉落的时候，有重力加速度，所以下落的速度应该越来越快，即Y的变化值
            // v = v0 + at;
            // s = 1/2 * at ^ 2; t表示每帧的间隔，即1/fps
            this.dY = 1;
            // 开始掉落的帧数
            this.dropStateFrame = game.frameUtil.currentFrame;
            // 鸟头部的方向旋转
            this.ro = 0;
            // 鸟当前的状态：0表示下降， 1表示上升
            this.state = 0;
            this.deltaY = 0;
            // 翅膀煽动的速度
            this.swingSpeed = 5;
            // 添加监听
            this.bindClickListener();
            // 小鸟是否已经死了的状态
            this.die_flag = false;
            // 小鸟死亡的血迹动画
            this.dieAnimate = 0;

        },
        // 上飞
        fly: function (){
            // 改变状态、鸟头的角度、每帧移动的距离
            this.state = 1;
            this.ro = -25;
            this.deltaY = 1;
            // 小鸟上升的时候改变翅膀煽动的速度
            this.swingSpeed = 2;
        },
        // 每帧都要执行
        update: function (){
            // 如果小鸟已经死了，就不需要渲染小鸟动画了
            if(this.die_flag == true){
                this.dieAnimate++;
                if(this.dieAnimate == 30){
                    game.pause();
                }
                return;
            }
            // 小鸟的翅膀的煽动
            // 如果当前的帧序号是5的倍数，就换翅膀的形态
            if(game.frameUtil.currentFrame % this.swingSpeed == 0){
                this.swing++;
                if(this.swing > 2){
                    this.swing = 0;
                }
            }
            // 如果小鸟当前状态是0（下降状态）时， 小鸟掉落，dY变化，从而影响 this.y变化
            if(this.state === 0){
                // 恢复小鸟翅膀煽动的速度
                this.swingSpeed = 5;
                // 为了模拟真实的自由落体的效果（越来越快的下落），加了dY下降的速度的变化
                this.dY = 0.005*Math.pow((game.frameUtil.currentFrame - this.dropStateFrame),2);
                // 鸟头部的方向也要旋转
                this.ro++;
            } else if (this.state === 1){ // 如果小鸟当前状态是1（上升状态）时，
                // 点击鼠标后，小鸟当前高度离上升极限this.flyHeight （120px）的高度差
                this.deltaY += 1;
                this.dY = -14 + this.deltaY;
                this.ro += 0.5;
                if(this.ro < 0){
                    this.ro = 0;
                }
                // 每次点击一瞬间只能飞到一定高度就应该转而向下掉，而不是一直往上飞，所以要设定一个高度限制（如：120px）
                if(this.dY > 0){
                    this.state = 0;
                    this.dropStateFrame = game.frameUtil.currentFrame;
                }
            }
            this.y += this.dY;

            // 鸟不能飞天也不能遁地，所有上下要有限制
            if(this.y < 0){
                this.y = 0;
            }
            // 碰地板了
            if(this.y > game.canvas.height -50 - this.h){
                game.gameover();
            }
            // 调用鸟类的点击监听方法
            this.bindClickListener();

        },
        render: function (){
            // 如果小鸟已经死了
            if(this.die_flag == true){
                var row = parseInt(this.dieAnimate /5);
                var col = this.dieAnimate % 5;
                game.ctx.drawImage(game.images.blood, 325*col, 138*row, 325, 138, this.x - 155, this.y + 50, 325, 138);
                return;
            }
            // 旋转公式
            game.ctx.save();
            game.ctx.translate(this.x+this.w/2, this.y+this.h/2);
            game.ctx.rotate((Math.PI/180) * this.ro);
            game.ctx.translate(-(this.x+this.w/2), -(this.y+this.h/2));
            game.ctx.drawImage(game.images.bird, this.w * this.swing, 0, this.w, this.h, this.x, this.y, this.w, this.h);
            game.ctx.restore();
        },

        // 绑定监听
        bindClickListener: function (){
            var self = this;  // self表示当前的鸟
            game.canvas.addEventListener('mousedown', function (){
                self.fly();
            });
            game.canvas.addEventListener("touchstart",function(e){
                e.preventDefault();
                self.fly();
            });
        }
    });
})();