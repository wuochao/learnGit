/**
 * 细胞方块类，有行row、列col、颜色color 等3个参数
 * row的合法值： 0~23
 * col的合法值： 0~11
 * color的合法值： 0~7
 */
(function (){
    window.CellBlock = Class.extend({
        init: function (row, col, color){
            this.row = row;
            this.col = col;
            this.color = color;
        },
        render: function (){
            game.ctx.drawImage(game.images.cellBlock, 20*(this.color-1), 0, 20, 20, 20*this.col, 20*this.row, 20, 20);
        }
    });


})();