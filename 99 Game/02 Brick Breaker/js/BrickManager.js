/**
 * 砖块管理类：管理画布上显示的砖块
 * 因为row的取值0~8共9个值，col取值0~7共8个值，所以砖块地图有row * col个元素，即9行8列
 */
(function () {
    window.BrickManager = Class.extend({
        init: function () {
            // this.map存放抽象地图
            this.map = [
                [0, 1, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [0, 4, 4, 4, 4, 4, 4, 0],
                [0, 3, 3, 3, 3, 3, 3, 0],
                [0, 2, 2, 2, 2, 2, 2, 0],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [0, 1, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];
            // 真实砖块
            this.bricks = [
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null]
            ];
            // 初始化就希望调用createBricksByMyMap方法，因此写在init里面
            // 一旦new了一个brickManager时，就会自动根据map初始化创建相应的brick
            this.createBricksByMyMap();
        },
        // 根据地图来创建砖块
        createBricksByMyMap: function () {
            // 循环遍历map，根据map，new出来很多的brick，放入bricks数组中
            // 如果map中的第r行第c列的数存在，表示有砖块，new一个砖块的对象，颜色就是this.map[r][c]
            for (var r = 0; r < 9; r++) {
                for (var c = 0; c < 8; c++) {
                    // 下面的语句是短路算法，如果this.map[r][c]不是0，那么执行后面的语句
                    this.map[r][c] && (this.bricks[r][c] = new Brick(r, c, this.map[r][c]));
                }
            }
        },
        // 更新所有砖块
        updateAllBricks: function () {
            for (var r = 0; r < 9; r++) {
                for (var c = 0; c < 8; c++) {
                    // 下面的语句是短路算法，如果this.bricks[r][c]不是null，那么执行后面的语句
                    this.bricks[r][c] && this.bricks[r][c].update();
                }
            }
        },
        // 渲染所有砖块
        renderAllBricks: function () {
            for (var r = 0; r < 9; r++) {
                for (var c = 0; c < 8; c++) {
                    // 下面的语句是短路算法，如果this.bricks[r][c]不是null，那么执行后面的语句
                    this.bricks[r][c] && this.bricks[r][c].render();
                }
            }
        }
    });
})();