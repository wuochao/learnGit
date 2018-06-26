/**
 * 计分类
 */
(function (){
    window.ScoreManager = Class.extend({
        init: function (){
            this.score = 0;
        },
        addScore: function (){
            this.score++;
        },
        update: function (){

        },
        render: function (){
            // 分析当前的分数有几位构成
            var weishu = this.score.toString().length;
            // 基准线的位置就是第一个数字（最左边）的x坐标
            var baseline = game.canvas.width/2 - weishu * 40 /2;

            // 循环遍历每一个数字
            for(var i=0; i<weishu; i++){
                var thisNum = parseInt(this.score.toString().substr(i, 1));
                //console.log(thisNum);
                renderOneNumber(thisNum, baseline+40*i, 100);
            }
        }
    });

    function renderOneNumber(num, x, y) {
        game.ctx.drawImage(game.images.number, 40*num, 0, 40, 57, x, y, 40, 57);
    }
})();