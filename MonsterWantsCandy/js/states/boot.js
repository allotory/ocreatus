/**
 * Created by Ellery on 2016/12/23.
 */

var Candy = {};

Candy.Boot = function(game) {};

Candy.Boot.prototype = {
    preload: function() {
        this.load.image("background", "assets/background.png");
        this.load.image("title", "assets/title.png");
        this.load.image("loading", "assets/loading.png");
    },
    create: function() {
        // 多点触控（设为 1 表示不需要多点触控）
        this.input.maxPointers = 1;
        // 游戏的旋转。
        // exact_fit、no_scale、 show_all：最大化游戏、禁用缩放、将确保游戏符合给定的尺寸，一切都会显示在屏幕上（按比例缩放 ）。
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        // 水平垂直方向居中
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // 启用缩放
        this.scale.updateLayout();

        this.state.start("Preloader");
    }
};
