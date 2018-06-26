/**
 * 背景类：所有的平铺背景，将有3个实例：房子、大树、地板
 */
(function (){
    window.Background = Class.extend({
        init: function (params){
            this.image = params.image;
            this.width = params.width;
            this.height = params.height;
            this.speed = params.speed;
            this.x = 0; // 队首的位置
            this.y = params.y;
            // 背景需要的个数才能平铺整个画布canvas？ 要用画布的width/背景图片的宽度，向上取整
            this.amount = parseInt(game.canvas.width/this.width)+1;
        },
        update: function (){
            this.x -= this.speed;
            if(this.x <= -this.width * this.amount){
                this.x = 0;
            }
        },
        // 绘制图片到画布canvas上
        render: function (){
            // 这里amount要乘以2，克隆一份背景，拉倒队首，重新动画，看上去才像是连续背景
            for(var i=0; i<this.amount*2; i++){
                // 这里的game是全局实例化的对象，可以调用ctx
                game.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x+this.width*i, this.y, this.width, this.height);
            }

        },
        pause: function (){
            this.speed = 0;
        }
    });
})();


