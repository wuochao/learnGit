/**
 * Map地图类，存储已经沉底的方块
 */
(function () {
    window.Map = Class.extend({
        init: function () {
            //有效行列。
            this.colAmount = 12;
            this.rowAmount = 24;
            // 存放的地图是抽象的数据
            this.existBlockMap = [
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxx000000000000xxx",
                "xxxxxxxxxxxxxxxxxx",    //补充4行XXXXXXXXXXXX，就相当于当活动方块到底遇到这些XXXXXXXXXX，挂住，不继续往下降落
                "xxxxxxxxxxxxxxxxxx",
                "xxxxxxxxxxxxxxxxxx",
                "xxxxxxxxxxxxxxxxxx"
            ];
            // 存放画布上有小方块的对象，是真实存放cellBlock的矩阵
            this.existBlock = [
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null]
            ];
        },
        // 根据地图创建方块的矩阵：先将existBlock清空，然后根据地图new方块
        createBlockByMap: function () {
            for (var r = 0; r < this.rowAmount; r++) {
                for (var c = 3; c < this.colAmount + 3; c++) {
                    var thisBlockColor = this.existBlockMap[r].substr(c, 1);
                    //短路运算，如果地图中的当前项existBlockMap[r].substr(c, 1)不为0，就创建existBlock[r][c]的小方块对象
                    if (thisBlockColor != "0") {
                        this.existBlock[r][c - 3] = new CellBlock(r, c - 3, thisBlockColor);
                    } else {
                        this.existBlock[r][c - 3] = null;
                    }
                }
            }
        },
        // 渲染所有沉底的方块
        renderAllExistBlocks: function () {
            for (var r = 0; r < this.rowAmount; r++) {
                for (var c = 0; c < this.colAmount; c++) {
                    //短路运算，如果地图中的当前项existBlock[r][c]不为null，就渲染该方块对象
                    this.existBlock[r][c] && this.existBlock[r][c].render();
                }
            }
        },
        //新老矩阵融合：活动方块矩阵与existBlock矩阵接触后，融合在一起
        addFourFourIntoMyMap: function (ab) {
            for (var r = 0; r < 4; r++) {
                for (var c = 0; c < 4; c++) {
                    var theAbChar = ab.fourfourMap[r].substr(c, 1);
                    // 如果4X4矩阵中这一位不是0，那么才替换
                    if (theAbChar != "0") {
                        this.existBlockMap[r + ab.row] = changeChar(this.existBlockMap[r + ab.row], c + ab.col + 3, theAbChar);
                    }
                }
            }
            // 融合后，要调用渲染函数
            this.createBlockByMap();
            // 验证游戏是否结束
            if(game.map.existBlockMap[0] != "xxx000000000000xxx"){
                game.stop();
                console.log("Game Over!!!");
            }
        },
        // 消行
        //最大难点：可以同时消除多行，所以要有一个数组存放着要消除的行的行号（满行的行号）。
        removeRow: function () {
            // 判断自己有没有能消除的行
            var fullRowNumber = [];
            // 下面的for循环仅仅是筛选，从最后一行开始筛选，找出哪些行是满行
            for (var row = this.rowAmount - 1; row >= 0; row--) {
                //这一行的字符串，形式如："xxx123123001230xxx"
                if(this.existBlockMap[row].indexOf("0") == -1){
                    // 如果该字符串中没有0，表示该行为满行
                    fullRowNumber.push(row);
                }
            }
            // 让满行都消除
            for(var i = 0; i < fullRowNumber.length; i++){
                this.existBlockMap[fullRowNumber[i]] = "xxx000000000000xxx";
                // 让Block更改
                this.createBlockByMap();
            }
            // 上面的行下移，下移几行比较复杂
            for(var i = fullRowNumber.length - 1; i >= 0; i--){
                // 从这一行开始，上面的所有行，都下移一行
                for(var j = fullRowNumber[i]; j > 0; j--){
                    this.existBlockMap[j] = this.existBlockMap[j-1];
                }
                // 让Block更改
                this.createBlockByMap();
            }

        }
    });

    /**
     * 将字符串obj的第x位替换为另一个新字符str的方法
     * @param obj   字符串
     * @param x     替换的位置
     * @param str   新字符
     * @returns {*}
     */
    function changeChar(obj, x, str) {
        if (x < 0 || x >= obj.length) {
            return;
        } else if (x == obj.length - 1) {
            return obj.slice(0, x) + str;
        } else {
            return obj.slice(0, x) + str + obj.slice(x + 1);
        }
    }


})();