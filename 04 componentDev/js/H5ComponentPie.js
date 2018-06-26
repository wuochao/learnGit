/* 饼图组件对象 */
var H5ComponentPie = function (name, cfg){
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 网格背景的画布
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 1);
    component.append(cns);

    var r = w/2;
    // 加入一个底层图
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    // 绘制一个数据层，不会有动画
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 2);
    component.append(cns);

    var colors = ['pink', 'skyblue', 'yellow', 'orange', 'cyan'];
    var sAngle = 1.5*Math.PI;   // 定义起始角度，在12点钟方位
    var eAngle = 0;             // 定义结束角度，在3点钟方位
    var aAngle = Math.PI*2;     // 100%的圆结束的角度 2PI = 360°

    var step = cfg.data.length;
    for(var i=0; i<step; i++){
        var item = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());

        eAngle = sAngle + aAngle* item[1];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.1;
        ctx.moveTo(r,r);
        ctx.arc(r, r, r, sAngle, eAngle);
        ctx.fill();
        ctx.stroke();
        sAngle = eAngle;

        // 加入所有项目的文本以及百分比
        var txt = $('<div class="txt"></div>');
        txt.text(cfg.data[i][0]);
        var percent = $('<div class="percent"></div>');
        percent.text(cfg.data[i][1]*100 + '%');
        txt.append(percent);

        var x = r + Math.sin(0.5*Math.PI - sAngle)*r;
        var y = r + Math.cos(0.5*Math.PI - sAngle)*r;

        // 修正文字坐标的位置
        if(x> w/2){
            txt.css('left', x/2);
        } else {
            txt.css('right', (w-x)/2);
        }

        if(y> h/2){
            txt.css('top', y/2);
        } else {
            txt.css('bottom', (h-y)/2);
        }

        // 文字颜色，如果有cfg.data[i][2]值，就设置，否则不设置
        if(cfg.data[i][2]){
            txt.css('color', cfg.data[i][2]);
            txt.css('color', '#fff');
            txt.css('backgroundColor', cfg.data[i][2]);
        }

        txt.css('opacity', 1);
        component.append(txt);
    }

    // 加入一个蒙板层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 3);
    component.append(cns);


    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;


    // 生长动画
    var draw = function (per){
        //清空画布
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.moveTo(r,r);
        if(per<=0){
            ctx.arc(r, r, r, 0, 2*Math.PI);
            component.find('.txt').css('opacity', 0);
        } else {
            ctx.arc(r, r, r, sAngle, sAngle + 2*Math.PI*per, true);
        }
        ctx.fill();
        ctx.stroke();

        if(per>=1){
            component.find('.txt').css('transition', 'all 0s');
            H5ComponentPie.resort(component.find('.txt'));
            component.find('.txt').css('transition', 'all 1s');
            component.find('.txt').css('opacity', 1);
            ctx.clearRect(0,0,w,h);
        }

    };

    component.on('onLoad', function (){
        //饼图的入场动画
        var s = 0;
        for(var i=0; i<100; i++){
            setTimeout(function (){
                s += 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });
    component.on('onLeave', function (){
        //饼图的退场动画
        var s = 1;
        for(var i=0; i<100; i++){
            setTimeout(function (){
                s -= 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });

    return component;
};

// 重排项目文本元素
H5ComponentPie.resort = function (list){
    // 1、检测相交
    var compare = function (domA, domB){
        // 元素的位置不用left获取，因为有时候left为auto
        var offsetA = $(domA).offset();
        var offsetB = $(domB).offset();
        // domA和domB的x轴投影
        var shadowA_x = [ offsetA.left, offsetA.left + $(domA).width() ];
        var shadowB_x = [ offsetB.left, offsetB.left + $(domB).width() ];
        // domA和domB的y轴投影
        var shadowA_y = [ offsetA.top,  offsetA.top  + $(domA).height() ];
        var shadowB_y = [ offsetB.top,  offsetB.top  + $(domB).height() ];

        // 检测x轴投影是否相交 （因为文本的定位left、right、top、bottom不同，所以不需要考虑重叠情况）
        var intersect_x = (shadowA_x[0]>shadowB_x[0] && shadowA_x[0]<shadowB_x[1])
                            || (shadowA_x[1]>shadowB_x[0] && shadowA_x[1]<shadowB_x[1]);
        // 检测y轴投影是否相交 （因为文本的定位left、right、top、bottom不同，所以不需要考虑重叠情况）
        var intersect_y = (shadowA_y[0]>shadowB_y[0] && shadowA_y[0]<shadowB_y[1])
                            || (shadowA_y[1]>shadowB_y[0] && shadowA_y[1]<shadowB_y[1]);

        // console.log('x相交：' + intersect_x);
        // console.log('y相交：' + intersect_y);
        return intersect_x && intersect_y;

    };
    // 2、错开重排（这里仅仅针对左右半圆中文字有相交的情况）
    var reset = function (domA, domB){
        // 要判断项目元素是否有top属性或bottom属性
        if($(domA).css('top') != 'auto'){
            $(domA).css('top', parseInt($(domA).css('top'))+$(domB).height());
        }
        if($(domA).css('bottom') != 'auto'){
            $(domA).css('bottom', parseInt($(domA).css('bottom'))+$(domB).height());
        }
    };

    // 定义将要重排的元素
    var willReset = [list[0]];



    // 遍历相交的元素，进行错开重排
    $.each(list, function (index, domTarget){
        if(compare(willReset[willReset.length-1], domTarget)){
            willReset.push(domTarget); // 不会自身加入到对比重排元素的数组中
        }
        if(willReset.length>1){
            $.each(willReset, function (index, domA){
                if(willReset[index+1]){
                    reset(domA, willReset[index+1]);
                }
            });
            // 这里需要递归调用，解决3个或者3个以上元素有相交的情况
            H5ComponentPie.resort( willReset );
        }

        // 在console中打印元素相交的情况
        // if( list[index+1]){
        //     console.log($(domTarget).text(), $(list[index+1]).text(), '相交', compare(domTarget, list[index+1]));
        // }
    });


};







