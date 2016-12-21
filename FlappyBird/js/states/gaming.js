/**
 * Created by Ellery on 2016/12/19.
 */

// 游戏主界面
function Gaming() {}

Gaming.prototype = {
    create: function() {
        // 背景
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_day");
        // 地面
        this.ground = this.game.add.tileSprite(0, this.game.height - 112, this.game.width, 112, "ground");
        // 用于存放管道的组
        this.pipeGroup = this.game.add.group();
        this.pipeGroup.enableBody = true;
        // 小鸟
        this.bird = this.game.add.sprite(50, 150, "bird_sheet");
        this.bird.animations.add("fly");
        this.bird.animations.play("fly", 12, true);
        this.bird.anchor.setTo(0.5, 0.5);

        // 声音
        this.soundFly = this.game.add.sound("fly_sound");
        this.soundScore = this.game.add.sound("score_sound");
        this.soundHitPipe = this.game.add.sound("hit_pipe_sound");
        this.soundHitGround = this.game.add.sound("hit_ground_sound");

        // 开启小鸟对象的物理系统
        // enable(object, system, debug)
        // 要开启物理系统的对象；选择物理系统（Arcade，P2, Ninja）；是否开启调试
        this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
        // 初始默认重力为 0
        this.bird.body.gravity.y = 0;

        // 开启地面的物理系统
        this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        // 地面不动
        this.ground.body.immovable = true;

        // get ready text
        this.getReady = this.game.add.image(this.game.width / 2, 40, "ready");
        this.getReady.anchor.setTo(0.5, 0);
        // tap tap
        this.tap = this.game.add.image(this.game.width / 2, 300, "tap");
        this.tap.anchor.setTo(0.5, 0);

        // 游戏是否已开始
        this.hasStarted = false;
        // 利用时钟事件来循环产生管道
        // loop(delay, callback, callbackContext, arguments)
        // 以指定的时间间隔无限重复执行某一个函数，直到调用了Timer对象的stop()方法才停止
        this.game.time.events.loop(900, this.generatePipes, this);
        // 先不要启动时钟
        this.game.time.events.stop(false);
        // 点击屏幕后正式开始游戏，只会执行一次
        this.game.input.onDown.addOnce(this.startGame, this);
    },
    startGame: function() {

        // 游戏速度
        this.gameSpeed = 200;
        // 游戏是否结束
        this.isGameOver = false;
        // 是否碰到地面
        this.hasHitGround = false;
        // 是否碰到天花板
        this.hasHitCeiling = false;
        // 游戏开始
        this.hasStarted = true;
        // 游戏得分
        this.score = 0;

        // 背景、地面移动
        this.background.autoScroll(-(this.gameSpeed / 10), 0);
        this.ground.autoScroll(-this.gameSpeed, 0);
        // 去掉 get ready 和 tap
        this.getReady.destroy();
        this.tap.destroy();

        // 小鸟设置重力
        this.bird.body.gravity.y = 1150;

        // 给鼠标按下事件绑定鸟的飞翔动作
        this.game.input.onDown.add(this.fly, this);
        // 启动时钟事件，开始制造管道
        this.game.time.events.start();
    },
    fly: function() {
        // 设置一个向上的重力（向上的速度）
        this.bird.body.velocity.y = -350;
        // 上升时小鸟头朝上的动画
        this.game.add.tween(this.bird).to({angle:-30}, 100, null, true, 0, 0, false);
        // fly 音效
        this.soundFly.play();
    },
    generatePipes: function(gap) {

        gap = gap || 100; //上下管道之间的间隙宽度
        var position = (505 - 320 - gap) + Math.floor((505 - 112 - 30 - gap - 505 + 320 + gap) * Math.random());
        var downPipeY = position-360;
        var upPipeY = position+gap;

        // // 缺口大小，100 + 0 ~ 100
        // // this.gap = parseInt(Math.floor(100 + Math.random() * 101));
        // gap = 100;
        // // 游戏高度去掉地面，上下管道最小值设为 40，
        // // 当下管道最小时，上部管道最大值为（高度 - gap - 40） = 260
        // // 档上管道最小时（position = 40），下管道也为最大值，所以 position 范围（40 ~ 260）
        // var position = parseInt(Math.floor(Math.random() * 220 + 40));
        // var downPipeY = position - 320;
        // var upPipeY = position + gap;

        // 检查当前是否有管道已经出了边界，如果有，则重置出了边界的那组管道的位置，如果没有，则生成一组新的管道
        if (this.resetPipe(downPipeY, upPipeY)) {
            return;
        }

        var topPipe = this.game.add.sprite(this.game.width, downPipeY, "pipe", 0, this.pipeGroup);
        var bottomPipe = this.game.add.sprite(this.game.width, upPipeY, "pipe", 1, this.pipeGroup);

        // //上方的管道
        // this.game.add.sprite(this.game.width, downPipeY, "pipe_down", 0, this.pipeGroup);
        // //下方的管道
        // this.game.add.sprite(this.game.width, upPipeY, "pipe_up", 0, this.pipeGroup);

        // setAll 快速设置该组所有 child 的相同属性到一个新值
        // 边界检测
        this.pipeGroup.setAll("checkWorldBounds", true);
        // 出边界后自动kill
        this.pipeGroup.setAll("outOfBoundsKill", true);
        // 设置管道运动的速度
        this.pipeGroup.setAll("body.velocity.x", -this.gameSpeed);
    },
    resetPipe: function(downPipeY, upPipeY) {
        var i = 0;
        // 对组调用 forEachDead 方法来获取那些已经出了边界，也就是 “死亡” 了的对象
        this.pipeGroup.forEachDead(function(pipe) {

            if(pipe.y <= 0){
                // 是上方的管道
                // 重置到初始位置，reset(x, y, health) 重置sprite对象的位置
                pipe.reset(this.game.width, downPipeY);
                // 重置为未得分
                pipe.hasScored = false;
            }else{
                // 是下方的管道
                // 重置到初始位置
                pipe.reset(this.game.width, upPipeY);
            }

            pipe.body.velocity.x = -this.gameSpeed; //设置管道速度
            i ++;
        }, this);

        // 如果 i==2 代表有一组管道已经出了边界，可以回收这组管道了
        return i == 2;
    },
    update: function() {
        // 每一帧中都要执行
        // 游戏未开始,先不执行任何东西
        if(!this.hasStarted) {
            return;
        }
        // 检测与地面的碰撞
        this.game.physics.arcade.collide(this.bird, this.ground, this.hitGround, null, this);
        // 检测与管道的碰撞
        this.game.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this);

        // 下降时鸟的头朝下的动画
        if(this.bird.angle < 90) {
            this.bird.angle += 2.5;
        }
        //分数检测和更新
        this.pipeGroup.forEachExists(this.checkScore, this);
    },
    hitPipe: function() {
        if(this.isGameOver) {
            return;
        }
        this.soundHitPipe.play();
        this.gameOver("pipe");
    },
    hitGround: function() {
        //已经撞击过地面
        if(this.hasHitGround) {
            return;
        }
        this.hasHitGround = true;
        this.soundHitGround.play();
        this.gameOver("haha");
    },
    gameOver: function(show_text) {
        this.isGameOver = true;
        this.stopGame();
        if(show_text != "") {
            this.showGameOverText(show_text);
        }
    },
    stopGame: function() {
        this.background.stopScroll();
        this.ground.stopScroll();
        this.pipeGroup.forEachExists(function(pipe){
            pipe.body.velocity.x = 0;
        }, this);
        this.bird.animations.stop("fly", 0);
        this.game.input.onDown.remove(this.fly, this);
        this.game.time.events.stop(true);
    },
    showGameOverText: function(info) {
        alert(info);
    },
    checkScore: function(pipe) {
        // 负责分数的检测和更新
        if(!pipe.hasScored && pipe.y<=0 && pipe.x<=this.bird.x-17-54){
            pipe.hasScored = true;
            // this.scoreText.text = ++this.score;
            this.soundScore.play();
            return true;
        }
        return false;
    }
};
