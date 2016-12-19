/**
 * Created by Ellery on 2016/12/19.
 */
function FlappyBird() {}

FlappyBird.prototype = {
    start: function() {
        var game = new Phaser.Game(288, 512, Phaser.AUTO, "game");

        game.state.add("boot", Boot);
        game.state.add("preload", Preload);
        game.state.add("menu", Menu);
        game.state.start("boot");
    }
};