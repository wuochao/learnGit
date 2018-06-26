/**
 * Game中介者
 */
(function () {
    window.Game = Class.extend({
        init: function (params) {
            //画布、上下文，都是game的属性
            this.canvas = document.getElementById(params.canvasId);
            this.ctx = this.canvas.getContext('2d');
            // 帧率
            this.fps = params.fps || 50;
            var self = this; // 备份this
            this.images = null;  // 用于接收ajax返回的静态资源（图片）对象
            // 静态资源管理
            this.sr = new StaticResourcesUtil();
            this.sr.loadImages('r.json', function (alreadyLoadNum, allNum, imagesObj) {
                // 清屏
                self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                // 这个函数将执行的次数取决于加载图片的数量
                self.ctx.font = '400 14px/20px "Microsoft YaHei"';
                self.ctx.fillText('正在加载图片资源，当前加载第' + alreadyLoadNum + '/' + allNum + '张', 20, 40);
                // 当加载完所有的静态资源（图片）时，就可以运行游戏了
                if (alreadyLoadNum == allNum) {
                    // 将存储了所有静态资源（图片）的对象imagesObj传给game的images数组
                    self.images = imagesObj;
                    self.run();
                }
            });

            // 当前游戏的状态，0表示小球黏在挡板上，1表示小球飞出去
            this.gameState = 0;
        },
        run: function () {
            // 有些实例化要放在run里面，因为要等到静态资源加载完成后才能实例化，
            // 并且有的需要用到game的实例对象时，必须等到new game执行后才能实例化某些对象
            // 实例化一个砖块管理器
            this.brickManager = new BrickManager();

            // 实例化一个小球的挡板
            this.racket = new Racket();

            // 实例化一个球
            this.ball = new Ball();

            var self = this;
            this.timer = setInterval(function () {
                self.mainloop();
            }, 1000 / this.fps);
        },
        // 每帧执行
        mainloop: function () {
            // 清屏
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // 调用BrickManager提供的渲染所有砖块的方法
            this.brickManager.updateAllBricks();
            this.brickManager.renderAllBricks();

            // 挡板的渲染（没有update，因为racket的绑定监听起到了跟update一样的作用）
            this.racket.render();

            // 小球的更新和渲染
            this.ball.update();
            this.ball.render();
        },
        stop: function () {
            clearInterval(this.timer);
        }
    });
})();