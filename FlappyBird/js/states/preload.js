/**
 * Created by Ellery on 2016/12/19.
 */

// 加载所有的游戏资源，然后切换到 menu 状态。
function Preload() {}

Preload.prototype = {
    preload: function() {

        // 加载页面背景 autoScroll 表示移动速度为10，负数表示向左
        // parameter: x, y, width, height, image_key
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_day").autoScroll(-10, 0);

        // 创建组
        var titleGroup = this.game.add.group();
        titleGroup.create(0, 0, "title");
        //创建bird对象并添加到组里
        var bird = titleGroup.create(190, 10, "bird_sheet");
        //给鸟添加动画
        bird.animations.add("fly");
        //播放动画
        bird.animations.play("fly", 12, true);
        //调整组的水平、垂直位置
        titleGroup.x = 35;
        titleGroup.y = 100;

        // 创建显示loading进度的sprite
        var preloadSprite = this.game.add.sprite(80, this.game.height/2, "loading");
        // 用setPreloadSprite方法来实现动态进度条的效果
        this.game.load.setPreloadSprite(preloadSprite);

        // 加载开始按钮（显示进度条后面没有语句时，进度条会不显示，只有一条竖线……^$(*#^@& why?）
        this.game.load.image("start_btn", "assets/start_btn.png");
        // 地面
        this.game.load.image("ground", "assets/ground.png");
        // get ready
        this.game.load.image("ready", "assets/get_ready.png");
        // tap
        this.game.load.image("tap", "assets/tap.png");

        //飞翔的音效
        this.game.load.audio("fly_sound", "assets/sounds/flap.wav");
        // 得分的音效
        this.game.load.audio("score_sound", "assets/sounds/score.wav");
        // 撞击管道的音效
        this.game.load.audio("hit_pipe_sound", "assets/sounds/pipe_hit.wav");
        // 撞击地面的音效
        this.game.load.audio("hit_ground_sound", "assets/sounds/ouch.wav");
        // 撞击天花板音效
        this.game.load.audio("hit_ceiling_sound", "assets/sounds/ouch.wav")

        // 管道
        this.game.load.image("pipe_up", "assets/pipe_up.png");
        this.game.load.image("pipe_down", "assets/pipe_down.png");
        // 管道
        this.game.load.spritesheet("pipe","assets/pipes.png", 54, 320, 2);
    },
    create: function() {
        this.game.state.start("menu");
    }
};
