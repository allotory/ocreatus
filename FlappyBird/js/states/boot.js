/**
 * Created by Ellery on 2016/12/19.
 */

// 加载预加载资源，并构建游戏的配置
function Boot() {}

Boot.prototype = {

    preload: function() {
        // 移动设备适应
        if(!this.game.device.desktop){
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forcePortrait = true;
            this.scale.refresh();
        }

        // 背景
        this.game.load.image("bg_day", "assets/bg_day.png");
        // 加载滚动条
        this.game.load.image("loading", "assets/loader.gif");
        // 游戏标题
        this.game.load.image("title","assets/title.png");
        // 小鸟
        // parameter: key, url, frameWidth, frameHeight, frameMax, margin, spacing
        // 名称，图片地址，帧宽度，帧高度，最大帧数，每帧外边距（0），每帧间隔（0）
        this.game.load.spritesheet("bird_sheet", "assets/bird_sheet.png", 34, 24, 3);
    },
    create: function() {
        this.game.state.start("preload");
    }
};