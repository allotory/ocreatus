/**
 * Created by Ellery on 2016/12/23.
 */

Candy.Preloader = function(game) {
    // 默认宽度高度
    Candy.WIDTH = 640;
    Candy.HEIGHT = 960;
};

Candy.Preloader.prototype = {
    preload: function() {
        this.add.tileSprite(0, 0, this.game.width, this.game.height, "background");
        this.add.sprite((Candy.WIDTH-395)/2, 60, "title");
        this.preloadBar = this.add.sprite((Candy.WIDTH-311)/2,
            (Candy.HEIGHT-27)/2, "loading");
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image("floor", "assets/floor.png");
        this.load.image("monster-cover", "assets/monster-cover.png");
        this.load.image("game-over", "assets/gameover.png");
        this.load.image("score-bg", "assets/score-bg.png");
        this.load.image("button-pause", "assets/button-pause.png");

        this.load.spritesheet("candy", "assets/candy.png", 82, 98);
        this.load.spritesheet("monster-idle",
            "assets/monster-idle.png", 103, 131);
        this.load.spritesheet("button-start",
            "assets/button-start.png", 401, 143);
    },
    create: function() {
        this.state.start("Menu");
    }
};
