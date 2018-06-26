/**
 * Created on 2018/1/18
 */
(function () {
    //游戏类。最最核心的类。
    window.Game = Class.extend({
        init: function (paramsJSON){
            var self = this;
            this.gameover_flag = false;
            this.fps = paramsJSON.fps || 60;
            // 定时器
            this.timer = null;
            // Game类是中介者模式的核心，要统领其他类
            // 帧工具对象
            this.frameUtil = new FrameUtil();
            // 创建canvas
            this.canvas = document.getElementById(paramsJSON.canvasId);
            // 获取canvas的上下文
            this.ctx = this.canvas.getContext('2d');
            // 所有图片
            this.images = null;
            // 实例化一个静态资源管理工具
            this.sr = new StaticResourcesUtil();
            // 利用这个静态资源管理工具加载图片
            this.sr.loadImages("r.json", function (alreadyLoadNum, allNum, imagesObj){
                // 先清屏
                self.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // 打印当前的加载图片的个数
                self.ctx.font = '20px Microsoft YaHei';
                self.ctx.fillText('正在加载' + alreadyLoadNum + ' / ' + allNum, 30, 50);
                // 判断当前加载图片的数量和总共图片数量是否相等，相等表示已经加载完所有图片，可以启动定时器运行游戏了（游戏开始）
                if(alreadyLoadNum === allNum){
                    self.images = imagesObj;
                    self.run();
                }
            });
        },
        // 开始游戏，核心类
        run: function (){
            // 备份this
            var self = this;
            // 开启定时器
            this.timer = setInterval(function (){
                // 主循环
                self.mainloop();
            }, 1000/self.fps );

            // 背景类的3个实例（必须写在run里面，因为要保证图片先加载后才能实例化背景图片）：房子、大树、地板
            this.fangzi = new Background({
                "image" : this.images.fangzi,
                "width" : 300,
                "height" : 256,
                "speed" : 1,
                "y" : this.canvas.height - 296
            });
            this.diban = new Background({
                "image" : this.images.diban,
                "width" : 48,
                "height" : 48,
                "speed" : 3,
                "y" : this.canvas.height - 48
            });
            this.shu  = new Background({
                "image" : this.images.shu,
                "width" : 300,
                "height" : 216,
                "speed" : 2,
                "y" : this.canvas.height - 264
            });

            // 实例化一个鸟
            this.bird = new Bird();
            // 实例化一个管子数组（管子有多个，不是一个，因此需要用数组）
            this.pipeArr = [ new Pipe() ];

            // 分数对象
            this.scoreManager = new ScoreManager();

        },
        // 主循环
        mainloop: function (){
            //里面的语句表示：每帧都执行
            this.frameUtil.update();
            // 清屏
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            // 在屏幕上打印fps
            this.ctx.font = '16px Consolas';
            this.ctx.fillText("FPS/ " + this.frameUtil.realFps, 10, 20);
            // 在屏幕上打印帧编号
            this.ctx.fillText("FNo/ " + this.frameUtil.currentFrame, 10, 40);

            // 房子更新、渲染
            this.fangzi.update();
            this.fangzi.render();
            // 地板更新、渲染
            this.diban.update();
            this.diban.render();
            // 大树更新、渲染
            this.shu.update();
            this.shu.render();

            // 鸟更新、渲染
            this.bird.update();
            this.bird.render();

            // 判断当前的帧数是不是130的整数倍，如果是，new一个新管子
            if( !this.gameover_flag && this.frameUtil.currentFrame % 130 ==0){
                this.pipeArr.push(new Pipe());
            }
            // 遍历所有的管子，让所有的管子都更新，渲染
            for(var i=0; i<this.pipeArr.length; i++){
                this.pipeArr[i].update();
                if(this.pipeArr[i]){
                    this.pipeArr[i].render();
                }
            }

            // 分数更新、渲染
            this.scoreManager.update();
            this.scoreManager.render();

        },
        // 暂停游戏
        pause: function (){
            //清除定时器
            clearInterval(this.timer);
        },
        gameover: function (){
            // 各种渲染的暂定
            this.fangzi.pause();
            this.diban.pause();
            this.shu.pause();
            for(var i=0; i<this.pipeArr.length; i++){
                this.pipeArr[i].pause();
            }
            this.gameover_flag = true;
            this.bird.die = true;
        }

    });
})();



