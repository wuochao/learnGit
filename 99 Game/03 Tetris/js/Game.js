/**
 * Game中介者
 */
(function (){
    window.Game = Class.extend({
        init: function (params){
            //画布、上下文，都是game的属性
            this.canvas = document.getElementById(params.canvasId);
            this.ctx = this.canvas.getContext('2d');
            // 帧率
            this.fps = params.fps || 50;
            var self = this; // 备份this
            this.images = null;  // 用于接收ajax返回的静态资源（图片）对象
            // 静态资源管理
            this.sr = new StaticResourcesUtil();
            this.sr.loadImages('r.json', function (alreadyLoadNum, allNum, imagesObj){
                // 清屏
                self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                // 这个函数将执行的次数取决于加载图片的数量
                self.ctx.font = '400 14px/20px "Microsoft YaHei"';
                self.ctx.fillText('正在加载图片资源，当前加载第'+ alreadyLoadNum + '张图片，共有：'+ allNum + '张', 10, 20);
                // 当加载完所有的静态资源（图片）时，就可以运行游戏了
                if(alreadyLoadNum == allNum){
                    // 将存储了所有静态资源（图片）的对象imagesObj传给game的images数组
                    self.images = imagesObj;
                    self.run();
                }
            });

            // 帧管理器
            this.frameUtil = new FrameUtil();

            // touchmove 手指下滑直接掉落方块时，函数节流
            this.dropflag = false;
        },
        run: function (){
            // 有些实例化要放在run里面，因为要等到静态资源加载完成后才能实例化，
            // 并且有的需要用到game的实例对象时，必须等到new game执行后才能实例化某些对象

            // 创建地图
            this.map = new Map();
            // 调用自己的地图方法
            this.map.createBlockByMap();
            // 测试当前活动方块
            this.activeBlock = new ActiveBlock();
            // 调用自己活动方块的方法，命令活动方块里面的4*4矩阵根据地图来创建cell
            this.activeBlock.createFourFourBlocksByMap();

            var self = this;
            this.timer = setInterval(function(){
                self.mainloop();
            }, 1000/this.fps);

        },
        // 每帧执行
        mainloop: function (){
            // 清屏
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // 更新帧管理器
            this.frameUtil.update();
            // 打印帧编号
            this.ctx.fillText(this.frameUtil.currentFrame, 300, 20);
            // 渲染所有的已经存在的方块（落地的方块）
            this.map.renderAllExistBlocks();
            // 调用自己的活动方块的渲染方法
            this.activeBlock.render();
            // 活动方块下移
            if(this.frameUtil.currentFrame % 20 == 0){
                this.activeBlock.goDown();
            }
        },
        stop: function (){
            clearInterval(this.timer);
        }
    });
})();