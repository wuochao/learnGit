/**
 * 帧工具类：提供当前的帧数（提供当前真实的fps）
 */
(function (){
    window.FrameUtil = Class.extend({
        init: function (){
            // 当前帧序号
            this.currentFrame = 0;

            // 起始帧，用于统计fps的时间戳
            this.sFrame = 0;
            this.sTime = new Date();

            // 真实的帧
            this.realFps = 0;


        },
        //更新，这个函数在mainloop每帧执行
        update: function (){
            // 当前帧序号自增
            this.currentFrame++;
            // 判断是否是 sFrame + 1000
            var t = new Date();
            if( t-this.sTime >= 1000){
                // 计算1000ms里面的帧序号的流逝，即在1000ms里面走过了多少帧，就表示每秒的帧数（帧率）
                this.realFps = this.currentFrame - this.sFrame;
                // 当前这一帧成为起始帧
                this.sFrame = this.currentFrame;
                // 当前帧的发生时间就是新的标志帧的时间
                this.sTime = t;
            }
        },



    });
})();