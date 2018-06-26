/* 散点图表组件对象 */
var H5ComponentPoint = function (name, cfg){
    var component = new H5ComponentBase(name, cfg);
    var base = cfg.data[0][1]; // 以第一个数据的，比例为大小 100%

    // 输出每个point
    $.each(cfg.data, function (index, item){
        var point = $('<div class="point point_'+ index +'"></div>');
        // 定义散点图中的文本
        var name = $('<div class="name">'+ item[0] +'</div>');
        var rate = $('<div class="per">'+ (item[1]*100) + '%' +'</div>');
        name.append(rate);
        point.append(name);

        var per = (item[1]/base * 100) + '%';
        point.width(per).height(per);
        // 防止有人没有设置散点图的名称，需要做个判断
        if(item[2]){
            point.css('backgroundColor', item[2]);
        }
        // 将每个散点图修改定位的位置
        if(item[3]!== undefined && item[4]!== undefined){
            point.css({
                'left':item[3],
                'top': item[4]
            });
        }

        component.append(point);
    });

    return component;

};
