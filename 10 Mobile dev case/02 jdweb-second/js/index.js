/**
 * Created by Administrator on 2017-6-12.
 */
window.onload = function ()
{
    bannerEffect();
    topbarEffect();
    timerBack(3700);


};

/**
 * topbarEffect函数
 * 作用： 当页面滚动时，如果页面上方卷曲的高度<=banner的高度，改变topbar的不透明度，
 * 如果页面上方卷曲的高度>=banner的高度，设置topbar的不透明度=1
 */
function topbarEffect()
{
    var banner = document.querySelector('.jd-banner');
    var bannerHeight = banner.offsetHeight;
    var topbar = document.querySelector('.topbar');
    window.onscroll = function () {
        var offsetTop = document.body.scrollTop;
        var opacity = 0;
        if (offsetTop < bannerHeight)
        {
            opacity = offsetTop / bannerHeight;
            topbar.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
        }
        else {
            topbar.style.backgroundColor = "rgba(233,35,34,1)";
        }
    };
}
/**
 * 倒计时函数
 * @param limitedTime
 */
function timerBack(limitedTime)
{
    var totalTime = limitedTime;
    var spans = document.querySelectorAll('.timerBack span');
    var timer = null;
    timer = setInterval(function(){
        totalTime--;
        if(totalTime<0)
        {
            clearInterval(timer);
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
    //1 动态修改页面结构
    var banner = document.querySelector('.jd-banner');
    var imgBox = document.querySelector('.imgBox');
    var firstImg = imgBox.querySelector('li:first-of-type');
    var lastImg = imgBox.querySelector('li:last-of-type');
    imgBox.appendChild(firstImg.cloneNode(true));
    imgBox.insertBefore(lastImg.cloneNode(true), imgBox.firstChild);

    //2 动态修改样式
    var bannerWidth = banner.offsetWidth;
    var lis = imgBox.querySelectorAll('li');
    var count = lis.length;
    imgBox.style.width = count*bannerWidth + "px";
    for(var i=0; i<lis.length; i++)
    {
        lis[i].style.width = bannerWidth;
    }

    //3 设置默认开始时，banner偏移，默认从
    imgBox.style.left = -bannerWidth + "px";

    //设置图片指针
    var imgIndex = 1;  //默认显示从第1张图片开始
    //4 动态监听屏幕改变，要重新获取bannerWidth后，重该bannerWidth
    window.onresize = function(){
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count*bannerWidth + "px";
        for(var i=0; i<lis.length; i++)
        {
            lis[i].style.width = bannerWidth;
        }
        imgBox.style.left = -imgIndex * bannerWidth + "px";
    };

    var ol = document.querySelector('.ol');
    var indicators = ol.querySelectorAll('li');
    //console.log(indicators.length);
    function setIndicators(index)
    {
        for(var i=0; i<indicators.length; i++)
        {
            indicators[i].classList.remove('active');
        }
        indicators[index].classList.add('active');
    }

    //5 实现轮播：每个2s，播放一张图片
    var timer = null;
    autoplay();
    function autoplay()
    {
        timer = setInterval(function(){
            clearInterval(timer);
            imgIndex++;
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -imgIndex * bannerWidth +"px";
        }, 2000);
    }

    //6 手动轮播
    var startX, moveX, distanceX;
    //设置节流阀
    var isEnd = true;
    imgBox.addEventListener('touchstart',function(e){
        clearInterval(timer);
        startX = e.targetTouches[0].clientX;
    });


    imgBox.addEventListener('touchmove',function(e){
        if(isEnd)
        {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            imgBox.style.transition="none";
            imgBox.style.left = (-imgIndex * bannerWidth + distanceX) + "px";
        }
    });


    imgBox.addEventListener('touchend',function(){
        isEnd = false;
        if(Math.abs(distanceX)>100) //翻页
        {
            if(distanceX>0)
            {
                imgIndex--;
            }
            else if(distanceX<0)
            {
                imgIndex++;
            }
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left = (-imgIndex * bannerWidth) + "px";
        }
        else if(Math.abs(distanceX)>0) //回弹
        {
            imgBox.style.transition="left 0.5s ease-in-out";
            imgBox.style.left = (-imgIndex * bannerWidth) + "px";
        }
        //数据清零，不然会影响下一次滑动
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });

    // 7 添加过渡结束事件
    imgBox.addEventListener('transitionend', function(){
        //过渡完成后，打开节流阀
        isEnd = true;
        //判断imgIndex的值是否大于count-1 或者小于 0
        if(imgIndex >= count-1)
        {
            imgIndex = 1;
        }
        else if(imgIndex <= 0)
        {
            imgIndex = count-2;
        }
        imgBox.style.transition = "none";
        imgBox.style.left = (-imgIndex*bannerWidth) + "px";
        setIndicators(imgIndex-1);
        autoplay();
    });



}
























