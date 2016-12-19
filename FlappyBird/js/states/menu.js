/**
 * Created by Ellery on 2016/12/19.
 */

// 主菜单
function Menu() {}

Menu.prototype = {
    create: function() {
        // 背景和地面动画， autoScroll 为速度
        // parameter: x, y, width, height, image_key
        var background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_day");
        background.autoScroll(-10, 0);
        var ground = this.game.add.tileSprite(0, this.game.height - 112, this.game.width, 112, "ground");
        ground.autoScroll(-100, 0);

        var titleGroup = this.game.add.group();
        titleGroup.create(0, 0, "title");
        var bird = titleGroup.create(190, 10, "bird_sheet");
        bird.animations.add("fly");
        bird.animations.play("fly", 12, true);
        titleGroup.x = 35;
        titleGroup.y = 100;

        // 对这个组添加一个tween动画，让它不停的上下移动
        // to(properties, duration, ease, autoStart, delay, repeat, yoyo)
        // properties :  js对象，里面包含着需要进行动画的属性，如上面代码中的 {y:120}
        // duration : 补间动画持续的时间，单位为毫秒
        // ease : 缓动函数，默认为匀速动画
        // autoStart : 是否自动开始
        // delay : 动画开始前的延迟时间，单位为毫秒
        // repeat : 动画重复的次数，如果需要动画永远循环，则把该值设为 Number.MAX_VALUE
        // yoyo : 如果该值为true,则动画会自动反转
        this.game.add.tween(titleGroup).to({ y:120 }, 1000, null, true, 0, Number.MAX_VALUE, true);

        // 添加一个按钮
        var btn = this.game.add.button(this.game.width / 2, this.game.height / 2, "start_btn", function(){
            //点击按钮时跳转到play场景
            this.game.state.start("play");
        });
        //设置按钮的中心点
        btn.anchor.setTo(0.5, 0.5);
    }
}
