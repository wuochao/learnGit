//发送ajax请求
$(function () {
    var $waterfall = $('.waterfall');
    // 得到模版
    var templateString = $('#feed_template').html();
    // 准备模版函数   
    var compile = _.template(templateString);

    // 准备最小高度的数组
    var colAllHeight = [0,0,0];

    var pagenum = 1;
    getAndRender(1);

    // 封装获取数据的函数
    function getAndRender(pagenum){
        //发出请求时，让小菊花（加载动画）显示
        $waterfall.addClass('loading');

        $.get('json/json' + pagenum + '.txt', function (data, statusText) {
            // 把字符串转为对象
            var dataJSON = JSON.parse(data);
            // news数组，数组装的是字典
            // console.log(dataJSON);
            var dictionaryArray = dataJSON.news;
            // console.log(dictionaryArray.length);
    
            // 增加终止标记，新增一个json文件，news数组为空
            // 如果数组为空就表示到最后了
            if(dictionaryArray.length == 0) {
                $waterfall.removeClass('loading');
                $('.end').show();
                lock = true;
                return;
            }

            // 遍历字典
            for(var i = 0; i<dictionaryArray.length; i++){
                var thisDictionary = dictionaryArray[i];
                // 马上发出这个字典里面图片的请求
                var image = new Image();
                // 一旦设置src，上行HTTP请求将发出，打开控制台-network页签可以看到图片的加载
                image.src = thisDictionary.imgurl;
                // 要给图片设置索引index
                image.index = i;
                // 监听图片是否加载完毕
                $(image).load(function (){ 
                    // 当这张图片加载完成后  
                    // console.log(this.index + '号---图片加载完毕！');
                    // 填充字典————哪个图片已经填充完了，就注入几号字典
                    var compiledStr = compile(dictionaryArray[this.index]);
                    // console.log(compiledStr);
    
                    // 得到这个盒子
                    var $box = $(compiledStr);
    
                    // 上DOM，注意这里填充时，不能把前面加载的图片都覆盖掉
                    $waterfall.append($box);
    
                    // 寻找最小列 和 最小列的索引
                    var minCol      = _.min(colAllHeight);
                    var minColIndex = _.indexOf(colAllHeight, minCol);
                    // console.log(minCol);
                    // console.log(minColIndex);
    
                    // 绝对定位
                    $box.css('left', 300 * minColIndex );
                    $box.css('top', colAllHeight[minColIndex] + 20);
      
                    // 将自己的高度也加到最小高度的数组的指定列中
                    colAllHeight[minColIndex] += $box.outerHeight() + 20;
                    
    
                    //淡入
                    $box.fadeIn();
                    //让waterfall的div有高度，因为feed-item都是绝对定位的，没办法把waterfall盒子撑开高度
                    $waterfall.css('height', _.max(colAllHeight));

                    //去除小菊花（加载动画）
                    $waterfall.removeClass('loading');
    
                });
            }
        });
        // 由于难以统计是否所有图片都加载完毕，所以这里加个setTimeout的延迟3s后，将节流阀lock=true
        // 这样的目的是： 当所有的图片都已经稳定，此时可以把lock 置为true，但是难以操作，所以就大概设置一个延迟时间
        setTimeout(function () {
            lock = true;
        }, 3000);
    }

    // 增加节流阀lock
    var lock = true;

    // 窗口的滚动监听
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        // console.log('已经卷入的高度' + scrollTop);
        // console.log('window的高度' + windowHeight);
        // console.log('文档的高度' + documentHeight);
        if(documentHeight - windowHeight - scrollTop < 200 && lock){
            lock = false;
            pagenum++;
            getAndRender(pagenum);
        }



    });
});