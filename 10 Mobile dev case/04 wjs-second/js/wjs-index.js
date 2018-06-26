/**
 * Created by Administrator on 2017-6-18.
 */

$(function(){
    //初始化产品块中的工具提示
    $('[data-toggle="tooltip"]').tooltip();

    //获取items
    var items = $('.carousel-inner div');
    $(window).on('resize',function(){
        //获取屏幕宽度并判断，大于768px使用背景图，小于768px使用img。
        var width = $(window).width();
        if(width>768)
        {
            items.each(function(index, dom){
                var imgSrc = $(dom).data('largeImage');
                $(dom).html($('<a href="#" class="pcImg"></a>').css('backgroundImage','url('+imgSrc+')'));
            });
        }
        else
        {
            items.each(function(index, dom){
                var imgSrc = $(dom).data('smallImage');
                $(dom).html($('<a href="#" class="mobileImg"><img src="'+imgSrc+'" alt=""/></a>'));
            });
        }
    }).trigger('resize');

    //增加手指滑动事件touchstart、touchend
    var startX, endX;
    $('.carousel-inner')[0].addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].clientX;
    });

    $('.carousel-inner')[0].addEventListener('touchend',function(e){
        endX = e.changedTouches[0].clientX;
        if(endX-startX>0)
        {
            //从左向右滑动，显示上一张
            $('.carousel').carousel('prev');
        }
        else if(endX-startX<0)
        {
            //从右向左滑动，显示下一张
            $('.carousel').carousel('next');
        }

    });

    //计算产品块导航条的原始高度并赋给nav-tabs
    var ul = $('.wjs-product .nav-tabs');
    var lis = ul.find('li');
    var totalWidth = 0; //设置ul总宽度
    lis.each(function(index, dom){
        totalWidth += $(dom).innerWidth();
    });
    ul.width(totalWidth);

    //使用插件iscroll.js给产品块的nav-tabs添加手动滑动
    var myScroll = new IScroll('#wrapper',{
        //设置水平滑动，不允许垂直滑动
        scrollX: true, scrollY: false
    });

});













