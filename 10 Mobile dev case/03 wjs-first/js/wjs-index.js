/**
 * Created by Administrator on 2017-6-18.
 */

$(function(){
    //初始化产品块中的工具提示
    $('[data-toggle="tooltip"]').tooltip();

    //获取轮播图的div
    var items = $('.carousel-inner .item');
    /*监听屏幕大小改变*/
    $(window).on('resize', function(){
        //1 获取当前屏幕的宽度
        var width = $(window).width();
        //2 判断屏幕宽度
        if(width>=768)
        {
            //非移动端：为每个item添加背景图片
            $(items).each(function(index, dom){
                var imgSrc = $(dom).data('largeImage');
                //添加非移动端的子元素
                $(dom).html($('<a href="javascript:void(0);" class="pcImg"></a>').css('backgroundImage','url('+imgSrc+')'));
            });
        }
        else
        {
            //移动端：为每个item添加img标签，并给a换成mobileImg类名
            $(items).each(function(index,dom){
                var imgSrc = $(dom).data('smallImage');
                $(dom).html($('<a href="javascript:void(0);" class="mobileImg"><img src='+imgSrc+' alt="..."></a>'));
            });
        }
    }).trigger('resize');

    //添加移动端的手动轮播（滑动操作）
    var startX, endX;
    //获取当前轮播图carousel
    var carousel = $('.carousel');
    var carousel_inner = $('.carousel-inner')[0];
    carousel_inner.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].clientX;
    });

    carousel_inner.addEventListener('touchend',function(e){
        endX = e.changedTouches[0].clientX;
        if(endX-startX>0)
        {
            //往右滑动，要显示上一张
            carousel.carousel('prev');
        }
        else if(endX-startX<0)
        {
            //往左滑动，要显示下一张
            carousel.carousel('next');
        }
    });

    //要计算产品块的导航项的原始宽度
    var ul = $('.wjs-product .nav-tabs');
    var lis = ul.find('li');
    var totalWidth = 0;  //记录ul的总宽度
    lis.each(function(index,dom){
        totalWidth += $(dom).innerWidth();
        //注意：width方法
        // width() 仅仅包括当前元素的内容宽度
        // innerWidth() 包括当前元素的内容宽度+padding
        // outerWidth() 包括当前元素的内容宽度+padding+border
        // outerWidth(true) 包括当前元素的内容宽度+padding+border+margin
    });
    ul.width(totalWidth);
    //使用插件实现导航条的滑动操作
    // 注意：默认是垂直滑动true，水平滑动false，因此要修改下
    var myScroll = new IScroll('.tab-parent',{
        scrollX: true,
        scrollY: false
    });











});
























