/* 雷达图组件对象 */
var H5ComponentRadar = function (name, cfg){
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 创建一个画布，背景
    var cns1 = document.createElement('canvas');
    var ctx1 = cns1.getContext('2d');
    cns1.width = ctx1.width = w;
    cns1.height = ctx1.height = h;
    component.append(cns1);

    var r = w/2;
    var step = cfg.data.length;

    // 计算一个圆周上的坐标（计算多边形的顶点坐标）
    // 已知： 圆心坐标(a,b)、半径r、角度deg
    // rad = (2*Math.PI/360) * (360/step) *i;
    // x = a + Math.sin(rad) * r;
    // y = a + Math.cos(rad) * r;

    // 绘制网格背景（分面绘制，分为10份）
    var isBlue = true;

    for(var s=10; s>0; s--){
        ctx1.beginPath();
        for(var i=0; i<step; i++){
            var rad = (2*Math.PI/360)*(360/step)*i;
            var x = r + Math.sin(rad) * r * (s/10);
            var y = r + Math.cos(rad) * r * (s/10);
            ctx1.lineTo(x, y);
        }
        ctx1.closePath();
        ctx1.fillStyle = isBlue? '#99c0ff':'#f1f9ff';
        isBlue = !isBlue;
        ctx1.fill();
    }

    // 绘制雷达图的伞骨
    for(var i=0; i<step; i++){
        var rad = (2*Math.PI/360)*(360/step)*i;
        var x = r + Math.sin(rad) * r;
        var y = r + Math.cos(rad) * r;
        ctx1.moveTo(r, r);
        ctx1.lineTo(x, y);
        // 输出项目文字，加5px的偏移更好看点
        var txt = $('<div class="txt"></div>');
        txt.text(cfg.data[i][0]);
        txt.css('transition', 'all 0.5s '+ i*0.1 + 's');
        if(x>w/2){
            // 如果当前文字在雷达图的右半边
            txt.css('left', x/2+5);
        } else {
            // 如果当前文字在雷达图的左半边
            txt.css('right', (w-x)/2+5);
        }
        if(y> h/2){
            // 如果当前文字在雷达图的上半边
            txt.css('top', y/2+5);
        } else {
            // 如果当前文字在雷达图的下半边
            txt.css('bottom', (h-y)/2+5);
        }
        if(cfg.data[i][2]){
            txt.css('color', cfg.data[i][2]);
        }
        txt.css('opacity',0);
        component.append(txt);
    }
    ctx1.strokeStyle = '#e0e0e0';
    ctx1.stroke();

    // 绘制数据层： 创建一个画布作为数据层
    var cns2 = document.createElement('canvas');
    var ctx2 = cns2.getContext('2d');
    cns2.width = ctx2.width = w;
    cns2.height = ctx2.height = h;
    component.append(cns2);

    /**
     * 绘制雷达图的数据函数draw
     * @param {float} per 0-1之间的数据，会根据这个值绘制最终数据对应的中间状态
     * @return {DOM}  component元素
     */
    ctx2.strokeStyle = '#f00';
    var draw = function( per ){
        if(per >= 1){
            component.find('.txt').css('opacity', 1);
        }
        if(per <= 1){
            component.find('.txt').css('opacity', 0);
        }
        // 清空画布
        ctx2.clearRect(0, 0, w, h);

        // 输出数据的折线
        for(var i=0; i<step; i++){
            var rad = (2*Math.PI/360)*(360/step)*i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;

            ctx2.lineTo(x, y);
        }
        ctx2.closePath();
        ctx2.stroke();

        // 输出数据的点（在折线上的点）
        ctx2.fillStyle = '#ff7676';
        for(var i=0; i<step; i++){
            var rad = (2*Math.PI/360)*(360/step)*i;
            var rate = cfg.data[i][1] * per;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx2.beginPath();
            ctx2.arc(x, y, 5, 0, 2*Math.PI);
            ctx2.closePath();
            ctx2.fill();
        }
    };


    component.on('onLoad', function (){
        // 雷达图生长动画
        var s = 0;
        for(var i=0; i<100; i++){
            setTimeout(function (){
                s += 0.01;
                draw(s);
            }, i*10 +500);
        }
    });

    component.on('onLeave', function (){
        // 雷达图退场动画
        var s = 1;
        for(var i=0; i<100; i++){
            setTimeout(function (){
                s -= 0.01;
                draw(s);
            }, i*10 +500);
        }

    });
    return component;


};












