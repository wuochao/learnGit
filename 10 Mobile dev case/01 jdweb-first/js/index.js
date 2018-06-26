/**
 * Created by Administrator on 2017-6-12.
 */

window.onload = function(){
    bannerEffect();
    topbarEffect();
    timerBack(3700);


};
function topbarEffect()
{
    //顶部搜索框滚动时，透明度变化
    //1、获取banner的高度
    var banner = document.querySelector('.jd-banner');
    var bannerHeight = banner.offsetHeight;
    var search = document.querySelector('.topbar');
    //2、获取当前屏幕滚动时，banner上面卷曲的高度
    window.onscroll = function(){
        var offsetTop = document.body.scrollTop;
        //3、当卷曲的高度在一定范围(滚动距离小于banner高度)时，topbar的透明度变化
        var opacity = 0;
        if(offsetTop < bannerHeight)
        {
            opacity = offsetTop/bannerHeight;
            search.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
        }
    };
}

function timerBack(limitedTime)
{
    var totalTime = limitedTime;
    var spans = document.querySelectorAll('.timerBack span');
    //console.log(spans);
    var timer = null;
    timer = setInterval(function(){
        totalTime--;
        if(totalTime < 0)
        {
            clearInterval(timer);
            return;
        }
        else
        {
            var h = Math.floor(totalTime/3600);
            var m = Math.floor(totalTime%3600/60);
            var s = Math.floor(totalTime%60);
            spans[0].innerHTML = Math.floor(h/10);
            spans[1].innerHTML = Math.floor(h%10);
            spans[3].innerHTML = Math.floor(m/10);
            spans[4].innerHTML = Math.floor(m%10);
            spans[6].innerHTML = Math.floor(s/10);
            spans[7].innerHTML = Math.floor(s%10);
        }
    }, 1000);






}

function bannerEffect()
{
    //1、动态修改轮播图结构
    //在第1张前，添加最后1张图片；在最后1张后，添加第1张图片
    var banner = document.querySelector('.jd-banner');
    var imgBox = banner.querySelector('ul:first-of-type');
    //console.log(imgBox);
    var firstImg = imgBox.querySelector('li:first-of-type');
    var lastImg = imgBox.querySelector('li:last-of-type');
    //复制1份第1张图片，添加到imgBox后面
    imgBox.appendChild(firstImg.cloneNode(true));
    //复制1份最后1张图片，添加到imgBox前面
    imgBox.insertBefore(lastImg.cloneNode(true), firstImg);

    //2、修改对应的样式
    //2.1 获取所有li、li的个数、banner宽度
    var lis = imgBox.querySelectorAll('li');
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    //2.2 设置图片盒子的宽度
    imgBox.style.width = count*bannerWidth + "px";
    //2.3 设置每个li的宽度
    for(var i=0; i<lis.length; i++)
    {
        lis[i].style.width = bannerWidth + "px";
    }
    //3、 修改默认偏移，让第1张图默认显示
    imgBox.style.left = -bannerWidth + "px";

    //4、当屏幕宽度变化时，监听重新计算宽度
    //设置图片指针，因为图片已经有1个bannerWidth的偏移
    var imgIndex = 1;
    window.onresize = function(){
        //4.1 动态获取banner宽度，覆盖全局的bannerWidth
        bannerWidth = banner.offsetWidth;
        //4.2 设置图片盒子的宽度
        imgBox.style.width = count*bannerWidth + "px";
        //4.3 设置每个li的宽度
        for(var i=0; i<lis.length; i++)
        {
            lis[i].style.width = bannerWidth + "px";
        }
        //4.4 修改默认偏移，让当前图片默认显示，注意不一定是第1张
        imgBox.style.left = -imgIndex*bannerWidth + "px";
    };

    //5、自动轮播
    var timer1 = null; //定义在外面成全局变量，后面需要清除和开启
    function autoplay()
    {
        timer1 = setInterval(function(){
            //5.1 图片指针变化
            imgIndex++;
            //5.2 添加过渡效果
            imgBox.style.transition = "left 0.5s ease-in-out";
            //5.3 设置偏移量
            imgBox.style.left = -imgIndex * bannerWidth + "px";
        },2000);
    }
    autoplay();

    //7、 实现点标记轮播，封装函数实现，并再过渡完成后调用
    var indicators = banner.querySelectorAll(".indicator li");
    //先清除所有li的active类名，再给当前li添加active类名（干掉所有，留下自己）
    function setIndicator(index)
    {
        for(var i=0; i<indicators.length; i++)
        {
            indicators[i].classList.remove('active');
        }
        indicators[index].classList.add('active');
    }


    //6、 手动轮播
    //绑定touchstart、touchmove、touchend事件
    //6.1 定义startX、moveX、distanceX 记录触发开始时的坐标值
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    //6.4 添加节流阀
    var isEnd = true;
    imgBox.addEventListener("touchstart", function(e){
        console.log("touchstart");
        clearInterval(timer1);
        startX = e.targetTouches[0].clientX;
    });
    //6.2 记录并判断滑动的距离
    imgBox.addEventListener("touchmove", function(e){
        console.log("touchmove");
        if(isEnd == true)
        {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            //清除过渡效果，不然从第2张滑动有延迟（第1张由于过渡效果还没加上，所以很流畅）
            imgBox.style.transition = "none";
            imgBox.style.left = -imgIndex*bannerWidth + distanceX +"px";
        }
    });

    //6.3 当松开手指后，判断滑动的距离是否大于100px，大于就翻页，否则就回弹
    imgBox.addEventListener("touchend", function(){
        //判断是否位移距离大于100px，如果大于100px才会去滑动页面，否则弹回
        //当|distanceX|>=100时，再根据是否大于0，来判断移动的方向，从而决定imgIndex的变化
        console.log("touchend");
        //松开手指时，当前滑动的距离正在执行，此时不允许再次拖拽，将节流阀设置成false
        //只有当翻页 和 回弹 时才需要过渡效果，手指滑动不需要过渡效果
        isEnd = false;
        if(Math.abs(distanceX)>=100)
        {   //大于100px就翻页
            if(distanceX>0)
                imgIndex--;
            else
                imgIndex++;
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -imgIndex * bannerWidth + "px";
        }
        else if(Math.abs(distanceX)>0)
        {
            //小于100px且大于0px表示滑动过但距离太小，就弹回原来的图片，imgIndex不变
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -imgIndex * bannerWidth + "px";
        }

        //将上一次touchmove所产生的move坐标值重置为0，不然影响下一次滑动
        startX = 0;
        moveX = 0;
        distanceX = 0;
        //最后再次开启自动轮播的定时器
        autoplay();
    });

    //添加transitionend过渡结束事件
    //transitionend:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件
    imgBox.addEventListener('transitionend', function(){
        console.log("transitionend");
        //判断：
        // 如果滑动到最后1张，要将imgIndex重置改成 1；
        // 如果滑动到第1张，  要将imgIndex重置改成 count-2；
        if(imgIndex >= count-1)
        {
            imgIndex = 1;
        }
        else if(imgIndex <= 0)
        {
            imgIndex = count-2;
        }
        imgBox.style.transition = "none";
        imgBox.style.left = -imgIndex * bannerWidth + "px";
        isEnd = true;
        setIndicator(imgIndex-1);
    });

}



