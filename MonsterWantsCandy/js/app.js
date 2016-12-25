/**
 * Created by Ellery on 2016/12/23.
 */

var game = new Phaser.Game(640, 960, Phaser.AUTO, "game");
game.state.add("Boot", Candy.Boot);
game.state.add("Preloader", Candy.Preloader);
game.state.add("Menu", Candy.Menu);
game.state.add("Game", Candy.Game);
game.state.start("Boot");
