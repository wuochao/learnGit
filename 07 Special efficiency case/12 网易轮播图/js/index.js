/**
 * Created by Administrator on 2017-5-23.
 */
window.onload = function(){
    //获取元素
    function $(id)
    {
        return document.getElementById(id);
    }
    var box = $('box');//获取最大的盒子
    var slider_main_block =$('slider_main_block'); //放置图片的盒子（2倍的图片宽度）
    var imgs = slider_main_block.children;         //获取所有图片的伪数组
    var slider_ctrl = $('slider_ctrl');            //获取控制的父盒子
    //根据img的数量动态生成span小方块
    for(var i=0; i<imgs.length; i++)
    {
        var span = document.createElement('span');
        span.innerHTML = i+1;       //这里可以添加 .String()转成字符串消除代码提示警告，也可以不加
        span.className = "slider-ctrl-con";
        slider_ctrl.insertBefore(span,slider_ctrl.children[slider_ctrl.children.length-1]);
    }

    //获取刚刚生成的所有span，并将第一个span添加current类名
    var spans = slider_ctrl.children;   //获取所有span
    spans[1].setAttribute("class","slider-ctrl-con current");//给第一个span添加current类名

    //将第1张图片放在舞台中央，其他图片放在舞台右边的一个图片宽度的位置（310px）
    //先获取大盒子box的宽度，也就是动画走动的距离
    var scrollWidth = box.clientWidth;
    for(var j=1; j<imgs.length; j++)
    {
        imgs[j].style.left = scrollWidth + "px";
    }

    //首先分析：可以点击的地方有3块： 左箭头、右箭头、下面控制的小span
    //遍历spans，并根据span的className类名来判断是否点击上面3种可点击的地方
    //第1个和第8个span分别是左箭头、右箭头，中间6个span是控制小方块
    //设置一个指针变量，指向当前在舞台中央的图片：它做离开舞台中央的动画
    var picIndex = 0;
    for(var k=0; k<spans.length; k++)
    {
        spans[k].onclick = function(){
            //console.log(111) 测试下是否遍历成功
            if(this.className == "slider-ctrl-prev")
            {
                //console.log("点击左箭头");
                //当前在舞台中央的图片要到舞台右侧scrollWidth位置
                animate(imgs[picIndex],{"left":scrollWidth});
                //同时picIndex-1的图片要从舞台左侧进入舞台中央（0的位置）
                picIndex--;  //picIndex--指向上一张图片
                //先判断下，此时是否小于第一张图片的索引号，如果小于，要将指针重新指向最后一张图片
                if(picIndex<0)
                {
                    picIndex = imgs.length-1;
                }
                //上一张图片，不管在何处，要先跑到舞台左侧，再慢慢走到舞台中央
                imgs[picIndex].style.left = -scrollWidth + "px";
                animate(imgs[picIndex],{"left":0});
                setSquare();
            }
            else if(this.className == "slider-ctrl-next")
            {
                //console.log("点击右箭头");
                //当前在舞台中央的图片要到舞台左侧-scrollWidth位置
                animate(imgs[picIndex],{"left":-scrollWidth});
                //同时picIndex+1的图片要从舞台右侧进入舞台中央（0的位置）
                picIndex++;  //picIndex++指向下一张图片
                //先判断下，此时是否大于最后一张图片的索引号，如果大于，要将指针重新指向第1张图片
                if(picIndex>imgs.length-1)
                {
                    picIndex = 0;
                }
                //下一张图片，不管在何处，要先跑到舞台右侧，再慢慢走到舞台中央
                imgs[picIndex].style.left = scrollWidth + "px";
                animate(imgs[picIndex],{"left":0});
                //右箭头完成后，可以拷贝修改成左箭头的代码
                setSquare();
            }
            else
            {
                //console.log("点击下面控制小方块");
                //点击小方块又有3种情况：
                // （1）点击当前图片的左侧小方块：点击索引对应的图片从左边走到舞台中央
                // （2）点击当前图片的右侧小方块：点击索引对应的图片从右边走到舞台中央
                // （3）点击当前图片的小方块本身：不需要图片运动
                //基于上述分析，首要要获得当前图片的索引号picIndex
                //利用span的innerHTML写的数字来当索引号，获取的是字符型，要先转换成数字型才方便运算
                var that = this.innerHTML-1;
                //console.log(that);        测试是否获得正确的数字以及类型
                //console.log(typeof that);
                //当点击的是右侧小方块时，做法类似于右侧按钮
                if(that > picIndex)
                {   //当前在舞台中央的图片要到舞台左侧-scrollWidth位置
                    animate(imgs[picIndex],{"left":-scrollWidth});
                    //点击的哪个索引号对应的图片要快速跑到舞台右侧scrollWidth位置，然后慢慢走到舞台中央
                    imgs[that].style.left = scrollWidth + "px";
                    animate(imgs[that],{"left":0});
                    //将点击的哪个索引号that赋给picIndex，以便下次重新计算图片的运动位置
                    //将点击的索引号that给到当前图片指针picIndex，因此下次播放要根据此时用户点击的索引号来决定
                    //比如：当前图片是第2张，用户点击了第5个小方块，那么下次出现的图片应该是第6张
                    picIndex = that;
                    setSquare();
                }
                //当点击的是左侧小方块时，做法与上面相反
                else if(that < picIndex)
                {   //当前在舞台中央的图片要到舞台右侧scrollWidth位置
                    animate(imgs[picIndex],{"left":scrollWidth});
                    //点击的哪个索引号对应的图片要快速跑到舞台左侧-scrollWidth位置，然后慢慢走到舞台中央
                    imgs[that].style.left = -scrollWidth + "px";
                    animate(imgs[that],{"left":0});
                    //将点击的哪个索引号that赋给picIndex，以便下次重新计算图片的运动位置
                    //将点击的索引号that给到当前图片指针picIndex，因此下次播放要根据此时用户点击的索引号来决定
                    //比如：当前图片是第4张，用户点击了第2个小方块，那么下次出现的图片应该是第3张
                    picIndex = that;
                    setSquare();
                }
                //当点击的是当前图片的小方块时，什么也不需要做，可以省略不写
                else
                {   //将点击的索引号that给到当前图片指针picIndex，因此下次播放要根据此时用户点击的索引号来决定
                    //比如：当前图片是第4张，用户点击了第2个小方块，应该是第3张
                    //picIndex = that;
                }
            }
        };
    }

    //封装一个函数：修改当前点击的span的类名
    function setSquare()
    {
        //清除所有小方块span的current类名，注意遍历的范围1-6，不包含0和7
        for(var i=1; i<spans.length-1; i++)
        {
            spans[i].className = "slider-ctrl-con";
        }
        //注意：当前图片索引要加1，因为spans[0]是左箭头
        spans[picIndex+1].className = "slider-ctrl-con current";
    }

    //设置定时器，自动播放
    var timer = null;
    timer = setInterval(autoplay, 2000);
    function autoplay()
    {
        //复制点击右箭头的代码即可
        //当前在舞台中央的图片要到舞台左侧-scrollWidth位置
        animate(imgs[picIndex],{"left":-scrollWidth});
        //同时picIndex+1的图片要从舞台右侧进入舞台中央（0的位置）
        picIndex++;  //picIndex++指向下一张图片
        //先判断下，此时是否大于最后一张图片的索引号，如果大于，要将指针重新指向第1张图片
        if(picIndex>imgs.length-1)
        {
            picIndex = 0;
        }
        //下一张图片，不管在何处，要先跑到舞台右侧，再慢慢走到舞台中央
        imgs[picIndex].style.left = scrollWidth + "px";
        animate(imgs[picIndex],{"left":0});
        //右箭头完成后，可以拷贝修改成左箭头的代码
        setSquare();
    }

    //鼠标经过和离开时，关闭/开启定时器
    box.onmouseover = function(){
        clearInterval(timer);
    };
    box.onmouseout = function(){
        clearInterval(timer);
        timer = setInterval(autoplay, 2000);
    };

};

