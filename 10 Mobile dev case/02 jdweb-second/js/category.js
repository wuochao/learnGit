/**
 * Created by Administrator on 2017-6-16.
 */
window.onload = function(){
    //获取左侧栏、左侧栏的高度
    var cLeft = document.querySelector('.ct-cLeft');
    var cLeftHeight = cLeft.offsetHeight;
    //获取ulList、ulList的高度
    var ulList = document.querySelector('.ulList');
    var ulListHeight = ulList.offsetHeight;
    //获取所有ulList中的li
    var lis = ulList.querySelectorAll('li');

    //设置在静止状态下，最大和最下的top值
    var maxTop = 0;
    var minTop = cLeftHeight - ulListHeight;
    //设置在滑动时，最大和最小top值
    var bounceMaxTop = maxTop + 100;
    var bounceMinTop = minTop - 100;
    //console.log(bounceMaxTop);
    //console.log(bounceMinTop);

    //设置滑动的初始参数 startY、moveY、distanceY
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    //设置记录当前距离的变量currentY
    var currentY = 0;

    //给ulList添加手指滑动事件 touchstart 、touchmove、touchend
    ulList.addEventListener('touchstart', function(e){
        startY = e.targetTouches[0].clientY;
    });

    ulList.addEventListener('touchmove', function(e){
        moveY = e.targetTouches[0].clientY;
        distanceY = moveY - startY;
        if((currentY+distanceY)>bounceMaxTop || (currentY+distanceY)<bounceMinTop)
        {
            console.log('滑动超过规定区域！');
            return;
        }
        //先清除可能添加的过渡效果，再将ulList移动到滑动的位置
        ulList.style.transition = "none";
        ulList.style.top = (currentY+distanceY) + "px";
    });

    ulList.addEventListener('touchend', function(){
        //判断当前滑动的距离是否小于静止状态下最小值minTop，如果小于，那么回弹到静止状态下的最小值minTop
        if((currentY+distanceY)<minTop)
        {
            ulList.style.transition = "top 0.5s ease-in-out";
            ulList.style.top = minTop + "px";
        }
        //判断当前滑动的距离是否大于静止状态下最大值maxTop，如果大于，那么回弹到静止状态下的最大值maxTop
        else if((currentY+distanceY)>maxTop)
        {
            ulList.style.transition = "top 0.5s ease-in-out";
            ulList.style.top = maxTop + "px";
        }
        //如果都不在上述两个状态中，那么就应该记录当前滑动的currentY值
        else
        {
            currentY += distanceY;
        }
    });

    //给ulList中每个li添加一个索引值
    //这里也可以用lis[i].setAttribute("index",i);，但是会给li添加一个属性，显示在页面上
    //而使用 lis[i].index = i;添加的index不会显示在页面上
    for(var i=0; i<lis.length; i++)
    {
        lis[i].index = i;
    }

    //定义itcast对象，用来封装tap事件
    var itcast = {
        //dom:传入的dom元素让我们可以为任意的元素添加tap事件
        tap: function(dom, callback){
            //判断是否传入对象同时对象应该是一个dom元素
            if(!dom || typeof dom!='object')
            {
                return;
            }
            var startTime, startX, startY;
            dom.addEventListener('touchstart',function(e){
                //判断是否是一只手指操作，超过1只手指就返回
                if(e.targetTouches.length>1)
                {
                    return;
                }
                //记录手指触摸的时间
                startTime = Date.now();
                //记录当前手指的坐标
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;
                //来做一些与事件相关的初始化操作
            });

            //touchend：当手指松开时候触发，意味着当前元素上已经没有手指对象了,所以无法通过targetTouches来获取手指对象
            dom.addEventListener('touchend', function(e){
                //判断是否是一只手指在操作
                if(e.changedTouches.length > 1)
                {   //表示不只一只手指在操作
                    return;
                }
                if(Date.now()-startTime > 150)
                {   //表示长按
                    return;
                }
                //判断松开手指时的坐标与触摸开始的坐标的距离差
                var endX = e.changedTouches[0].clientX;
                var endY = e.changedTouches[0].clientY;
                //这里暂且将距离差异定为6px
                if(Math.abs(endX-startX)<6 && Math.abs(endY-startY)<6)
                {
                    console.log("这就是移动端的点击事件--tap事件");
                    //执行tap事件响应后的处理操作
                    callback && callback(e);
                }

            });
        }
    };

    //绑定移动端的tap事件
    itcast.tap(ulList,  function(e){
        // 1. 清除ulList中所有li的active类名
        for(var i=0; i<lis.length; i++)
        {
            lis[i].classList.remove('active');
        }
        // 2. 给当前点击的li添加active类名
        var currentLi = e.target.parentNode;
        currentLi.classList.add('active');
        var currentLiHeight = currentLi.offsetHeight;
        // 3. 将点击的li移动到ulList的最顶部，但是不能超过静止状态下的最大top值，minTop
        var index = currentLi.index;
        // 开始过渡效果
        ulList.style.transition = "top 0.5s ease-in-out";
        if(-index*currentLiHeight < minTop)
        {
            ulList.style.top = minTop + "px";
            currentY = minTop;
        }
        else
        {
            ulList.style.top = -index * currentLiHeight + "px";
            currentY = -index * currentLiHeight;
        }
    });

};




































































