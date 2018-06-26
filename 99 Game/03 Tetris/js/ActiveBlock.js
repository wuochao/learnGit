/**
 * 活动方块类：ActiveBlock
 * 这个类最重要的是携带 4*4 小矩阵地图
 */
(function () {
    var allType = {
        "I": [["0010", "0010", "0010", "0010"],
            ["0000", "1111", "0000", "0000"]],
        "L": [["0200", "0200", "0220", "0000"],
            ["0000", "2220", "2000", "0000"],
            ["2200", "0200", "0200", "0000"],
            ["0020", "2220", "0000", "0000"]],
        "J": [["0300", "0300", "3300", "0000"],
            ["3000", "3330", "0000", "0000"],
            ["0330", "0300", "0300", "0000"],
            ["0000", "3330", "0030", "0000"]],
        "Z": [["0000", "4400", "0440", "0000"],
            ["0400", "4400", "4000", "0000"]],
        "T": [["0000", "5550", "0500", "0000"],
            ["0500", "5500", "0500", "0000"],
            ["0500", "5550", "0000", "0000"],
            ["0500", "0550", "0500", "0000"]],
        "O": [["0660", "0660", "0000", "0000"]],
        "S": [["0770", "7700", "0000", "0000"],
            ["7000", "7700", "0700", "0000"]]
    };


    window.ActiveBlock = Class.extend({
        init: function (type) {
            this.row = 0; // 默认在中间出现活动方块 0行5列
            this.col = 6;
            // 随机产生一个字母的类型
            var typechar = "ILJZTOS";
            this.randomChar = typechar.substr(parseInt(Math.random() * 7), 1);
            // 随机选取一个活动方块的方向（当前活动方块的方向总数
            this.directionAmount = allType[this.randomChar].length;
            this.direction = parseInt(Math.random() * this.directionAmount);
            // 抽象形态（4*4小矩阵的地图）
            this.fourfourMap = allType[this.randomChar][this.direction];
            // 真实存放数据的矩阵
            this.fourfourBlocks = [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
            ];
            //绑定监听
            this.bindListener();


        },
        // 根据4*4 小矩阵地图修改四方矩阵
        createFourFourBlocksByMap: function () {
            for (var r = 0; r < 4; r++) {
                for (var c = 0; c < 4; c++) {
                    // 当前小方块的颜色
                    var color = this.fourfourMap[r].substr(c, 1);
                    // 根据当前color是不是不等于0，如果是，new一个小方块，否则null
                    if (color != '0') {
                        // 当前小方块的位置是根据当前活动方块整体的位置+它在活动方块中相对位置，进行计算
                        this.fourfourBlocks[r][c] = new CellBlock(this.row + r, this.col + c, color);
                    } else {
                        this.fourfourBlocks[r][c] = null;
                    }
                }
            }
        },
        //下移
        goDown: function () {
            // 要进行是否能够下移一行的判断，算法： 从existBlockMap中截取4*4片段，然后与当前的activeBlock矩阵进行比较
            var qiepian = [];
            for (var r = this.row + 1; r < this.row + 5; r++) {
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3, 4));
            }
            // 比较existBlockMap中的4X4切片qiepian和活动块this.fourfourMap的4X4矩阵，看这两个矩阵是否有位置不都是0,（冲突）
            if (checkTwoFF(qiepian, this.fourfourMap)) {
                this.row++;
                this.createFourFourBlocksByMap();
                return true;
            } else { // 不能下降时，调用融合函数，并且new一个新的activeBlock
                game.map.addFourFourIntoMyMap(this);
                // new一个新的活动方块
                game.activeBlock = new ActiveBlock();
                // 消行判定eliminateRow
                game.map.removeRow();
                return false;

            }
        },
        //直接沉底
        goBottom: function () {
            while (this.goDown()) {
                this.goDown();
            }
            // 播放声音
            document.getElementById('au').load();
            document.getElementById('au').play();
        },
        //左移
        goLeft: function () {
            // 要进行是否能够左移一列的判断，算法： 从existBlockMap中截取4*4片段，然后与当前的activeBlock矩阵进行比较
            var qiepian = [];
            for (var r = this.row; r < this.row + 4; r++) {
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3 - 1, 4));
            }
            if (checkTwoFF(qiepian, this.fourfourMap)) {
                this.col--;
                this.createFourFourBlocksByMap();
            }
        },
        //右移
        goRight: function () {
            // 要进行是否能够右移一列的判断，算法： 从existBlockMap中截取4*4片段，然后与当前的activeBlock矩阵进行比较
            var qiepian = [];
            for (var r = this.row; r < this.row + 4; r++) {
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3 + 1, 4));
            }
            if (checkTwoFF(qiepian, this.fourfourMap)) {
                this.col++;
                this.createFourFourBlocksByMap();
            }
        },
        // 改变活动方块的方向
        changeDirection: function () {
            //让自己的方向加1
            this.direction++;
            if (this.direction > this.directionAmount - 1) {
                this.direction = 0;
            }
            // 重新得到一个4x4矩阵，必须能转，所以需要写一个test等待验收，使用切片判断能否旋转
            var testfourfourMap = allType[this.randomChar][(this.direction + 1) % this.directionAmount];
            // 截取当前4X4矩阵比较
            var qiepian = [];
            for (var r = this.row; r < this.row + 4; r++) {
                qiepian.push(game.map.existBlockMap[r].substr(this.col + 3, 4));
            }
            if (checkTwoFF(testfourfourMap, qiepian)) {
                this.fourfourMap = testfourfourMap; //验收通过，可以旋转
                // 重新生成真实的4X4活动方块矩阵
                this.createFourFourBlocksByMap();
                this.direction++;
            }
        },

        render: function () {
            //遍历fourfourBlocks数组
            for (var r = 0; r < 4; r++) {
                for (var c = 0; c < 4; c++) {
                    //判断自己的4*4小矩阵this.fourfourBlocks[r][c]是否为null，如果是，不渲染，否则，渲染
                    if (this.fourfourBlocks[r][c]) {
                        this.fourfourBlocks[r][c].render();
                    }
                }
            }
        },
        // 绑定监听
        bindListener: function () {
            var self = this;
            // 绑定键盘的4个方向键的监听
            document.onkeydown = function (event) {
                if(event.keyCode == '37'){ //左键
                    self.goLeft();
                } else if(event.keyCode == '38'){ //上键：切换方块方位
                    self.changeDirection();
                } else if(event.keyCode == '39'){ //右键
                    self.goRight();
                } else if(event.keyCode == '40'){ //下键
                    self.goDown();
                }
            };

            // touch事件
            var startX;
            var startY;
            var moveflag = false; // 默认不移动（标识）
            game.canvas.addEventListener("touchstart", function(event){
                event.preventDefault();
                // 触摸开始
                startX = event.touches[0].pageX;
                startY = event.touches[0].pageY;
            });
            game.canvas.addEventListener("touchmove", function(event){
                event.preventDefault();
                // 触摸滑动：
                // 当手指往左边移动每20px时，活动方块左移一次
                // 当手指往右边移动每20px时，活动方块右移一次
                var dX = event.touches[0].pageX - startX;
                var dY = event.touches[0].pageY - startY;
                if(dX < -20){
                    self.goLeft();
                    startX = event.touches[0].pageX;    //函数节流
                    moveflag = true;       // 留给touchend作为是否移动标记
                } else if(dX > 20){
                    self.goRight();
                    startX = event.touches[0].pageX;
                    moveflag = true;
                }
                if(dY > 100 && !game.dropflag){
                    self.goBottom();
                    game.dropflag = true;
                }

            });
            game.canvas.addEventListener("touchend", function(event){
                event.preventDefault();
                // 旋转，并不是用户每次手指从屏幕上拿开就旋转
                // 如果用户触摸导致了移动，就不应该旋转
                if(!moveflag && !game.dropflag){
                    self.changeDirection();
                }
                moveflag = false;
            });
        }


    });

    // 这个函数检测A、B的两个4X4矩阵是否有相同位置上的重合，返回true表示没有重合，返回false表示有重合
    function checkTwoFF(A, B) {
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 4; c++) {
                var Achar = A[r].substr(c, 1);
                var Bchar = B[r].substr(c, 1);
                if (Achar != "0" && Bchar != "0") {
                    return false;
                }
            }
        }
        return true;
    }

})();