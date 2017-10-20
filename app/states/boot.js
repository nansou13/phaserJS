'use strict';

function Boot(){}

Boot.prototype = {
    preload: function(){
        this.game.stage.disableVisibilityChange = true;
        this.game.stage.backgroundColor = 0x3b0760;
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

        this.showLoadingText();
        this.loadAssets();
    },

    onLoadComplete: function(){
        this.game.state.start('login');
    },

    loadAssets: function(){
        this.game.load.image('sky', 'gameAssets/sky.png');
        this.game.load.image('ground', 'gameAssets/platform.png');
        this.game.load.image('star', 'gameAssets/star.png');
        this.game.load.spritesheet('dude', 'gameAssets/dude.png', 32, 48);
        this.game.load.spritesheet('h1', 'assets/h1.png', 32, 32);
    	this.game.load.spritesheet('h2', 'assets/h2.png', 32, 32);

    },

    showLoadingText: function(){
        var loadingText = "- Loading -";
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, loadingText);
        //  Centers the text
        text.anchor.set(0.5);
        text.align = 'center';

        //  Our font + size
        text.font = 'Arial';
        text.fontWeight = 'bold';
        text.fontSize = 70;
        text.fill = '#ffffff';
    }
};

module.exports = Boot;
