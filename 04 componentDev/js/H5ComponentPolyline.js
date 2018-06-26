/* 折现图组件对象 */
var H5ComponentPolyline = function (name, cfg){
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 创建一个画布，网格线背景
    var cns1 = document.createElement('canvas');
    var ctx1 = cns1.getContext('2d');
    cns1.width = ctx1.width = w;
    cns1.height = ctx1.height = h;
    component.append(cns1);

    // 水平网格线 100份 -> 10份
    var step = 10;
    ctx1.beginPath();
    ctx1.lineWidth = 1;
    ctx1.strokeStyle = '#aaa';
    window.ctx1 = ctx1;
    for(var i=0; i<step+1; i++){
        var y = (h/step) * i;
        ctx1.moveTo(0, y);
        ctx1.lineTo(w, y);
    }
    // 垂直网格线，根据项目的个数分
    step = cfg.data.length+1;
    var txt_w = w/step >> 0; /* >>0 是去掉小数的意思 */
    for(var j=0; j<step+1; j++){
        var x = (w/step) * j;
        ctx1.moveTo(x, 0);
        ctx1.lineTo(x, h);
        if(cfg.data[j]){
            var txt = $('<div class="txt"></div>');
            txt.text( cfg.data[j][0] );
            txt.css('width', txt_w/2);
            txt.css('left', x/2+txt_w/4);

            component.append(txt);
        }
    }
    ctx1.stroke();

    // 创建画布，折线数据层
    var cns2 = document.createElement('canvas');
    var ctx2 = cns2.getContext('2d');
    cns2.width = ctx2.width = w;
    cns2.height = ctx2.height = h;
    component.append(cns2);

    /**
     * 绘制折线以及对应的数据和阴影的函数draw
     * @param {float} per 0-1之间的数据，会根据这个值绘制最终数据对应的中间状态
     * @return {DOM}  component元素
     */
    var draw = function( per ){
        // 清空画布
        ctx2.clearRect(0,0,w,h);

        // 绘制折线数据
        ctx2.beginPath();
        ctx2.lineWidth = 3;
        ctx2.strokeStyle = '#ff7276';

        var data_x = 0;
        var data_y = 0;
        // ctx2.moveTo(10, 10);
        // ctx2.arc(10, 10, 5, 0, 2*Math.PI);
        var row_x = w/(cfg.data.length+1);

        // 描点
        for( var k in cfg.data ){
            var item = cfg.data[k];
            data_x = row_x * k + row_x;
            data_y = h * (1 - item[1]* per) ;
            ctx2.moveTo(data_x, data_y);
            ctx2.arc(data_x, data_y, 5, 0, 2*Math.PI);

            ctx2.moveTo(data_x, data_y);

        }

        // 连线，移动画笔到第一个点的位置
        var line_x = 0;
        var line_y = 0;
        ctx2.moveTo( row_x, h*(1 - cfg.data[0][1]*per));
        for( var t in cfg.data ){
            var item = cfg.data[t];
            line_x = row_x * t + row_x;
            line_y = h * (1 - item[1]*per);
            ctx2.lineTo(line_x, line_y);
            item[2]? ctx2.fillStyle = item[2] : ctx2.fillStyle = '#222';
            ctx2.fillText(((item[1]*100)>>0) + '%', line_x-5, line_y-15); // 写数据的数值
        }
        ctx2.stroke();
        // 绘制阴影
        ctx2.lineTo(line_x, h);
        ctx2.lineTo(row_x, h);
        ctx2.fillStyle = 'rgba(255,136,1209,0.2)';
        ctx2.fill();
    };

    // 入场动画，onLoad
    component.on('onLoad', function (){
        // 折线图的生长动画
        var s = 0;
        for(var i=0; i<100; i++){
            setTimeout(function (){
                s+= 0.01;
                draw(s);
            }, i*10+500);
        }
    });
    // 退场动画，onLeave
    component.on('onLeave', function (){
        // 折线图的生长动画
        var s = 1;
        for(var i=0; i<100; i++){
            setTimeout(function (){
                s-= 0.01;
                draw(s);
            }, i*10);
        }
    });

    return component;
};






