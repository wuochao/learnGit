/**
 * 静态资源工具类：用于加载所有的静态图片、音乐
 */

(function (){
    window.StaticResourcesUtil = Class.extend({
        init: function (){
            // 注意：这里不将this.images设置成数组，因为js的数组没有下标（下标只能是0,1,2....）
            this.images = new Object();
        },
        // 读取图片，有2个参数，第1个是json，表示读取的列表，第2个是回调函数，该回调函数有3个参数：已经加载的图片、总数量、所有图片的对象
        loadImages: function (jsonUrl, callback){
            var self = this; // 备份this
            // 先读取json文件，使用ajax三步走
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (){
                if(xhr.readyState == 4){
                    if(xhr.status >=200 && xhr.status <300 || xhr.status ==304){
                        // 已经加载好的图片数量
                        var alreadyLoadNum = 0;
                        // 将json里面的纯文本转换为json对象
                        var jsonObj = JSON.parse(xhr.responseText);
                        // 遍历向每个图片发出请求
                        for(var i=0; i<jsonObj.images.length; i++){
                            // 创建一个图片image
                            var image = new Image();
                            // 一旦设置src属性，请求发出
                            image.src = jsonObj.images[i].src;
                            // 给图片编号index
                            image.index = i;
                            image.onload = function (){
                                // 图片加载完毕后，将已经加载好的图片数量alreadyLoadNum自增
                                alreadyLoadNum++;
                                // 保存在自己的images属性里面，存储的是单独的对象
                                self.images[jsonObj.images[this.index].name] = this; // 这里的this表示刚刚被加载的这张图片
                                // 回调函数
                                callback(alreadyLoadNum, jsonObj.images.length, self.images );
                            };
                        }

                    }
                }
            };
            xhr.open('get', jsonUrl, true);
            xhr.send(null);
        }
    });
})();


































