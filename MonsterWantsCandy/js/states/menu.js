/**
 * Created by Ellery on 2016/12/23.
 */

Candy.Menu = function(game){};

Candy.Menu.prototype = {
    create: function() {
        this.add.sprite(0, 0, "background");
        this.add.sprite(-130, Candy.HEIGHT-514, "monster-cover");
        this.add.sprite((Candy.WIDTH-395)/2, 60, "title");
        this.add.button(Candy.WIDTH-401-10, Candy.HEIGHT-143-10,
            "button-start", this.startGame, this, 1, 0, 2);
    },
    startGame: function() {
        this.state.start("Game");
    }
};

