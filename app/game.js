"use strict";

var gameBootstrapper = {
    init: function(gameContainerId){
      var game = new Phaser.Game(800, 480, Phaser.AUTO, gameContainerId);

      game.state.add('boot', require('./states/boot'));
      game.state.add('login', require('./states/login'));

      game.state.start('boot');
    }
};

module.exports = gameBootstrapper;
