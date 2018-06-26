/**
 * 静态资源加载类：管理项目中需要的静态资源（如：图片、音乐等）
 */
(function () {
    window.StaticResourcesUtil = Class.extend({
        init: function () {
            this.images = {};
        },
        //读取图片
        //调用loadImages有两个参数。
        //第一个是JSON，表示读取的列表
        //第二个是回调函数，回调函数又接受3个参数：已经加载的数量、总数量、图片对象
        loadImages: function (jsonUrl, callback) {
            var self = this; //备份this
            // 创建xhr对象实现ajax请求图片的json文件
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        // 已经加载好的图片数量
                        var alreadyLoadNum = 0;
                        // 将json文件里面的纯文本转换成json格式的对象
                        var jsonObj = JSON.parse(xhr.responseText);
                        // 遍历得到的jsonObj对象，依次请求每张图片
                        for (var i = 0; i < jsonObj.images.length; i++) {
                            // 创建一个图片，并设置src属性为图片的地址
                            var image = new Image();
                            image.src = jsonObj.images[i].src;
                            // 图片编号
                            image.index = i;
                            // 监听图片加载事件
                            image.onload = function () {
                                // 已经加载好的图片数量加1
                                alreadyLoadNum++;
                                // 保存在自己的images属性里面，存储的是每张图片的对象
                                self.images[jsonObj.images[this.index].name] = this;
                                // 调用回调函数处理已经加载的图片
                                callback(alreadyLoadNum, jsonObj.images.length, self.images);
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