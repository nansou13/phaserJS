'use strict';

var CharacterObj = require('gameObjects/CharacterObj');

function Login(){}

//var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

Login.prototype = {
    preload: function(){
        this.game.load.image('sky', 'gameAssets/sky.png');
        this.game.load.image('ground', 'gameAssets/platform.png');
        this.game.load.image('star', 'gameAssets/star.png');
        this.game.load.spritesheet('dude', 'gameAssets/dude.png', 32, 48);
    },

    setupSpriteGroups: function(){
        this.game.platforms =  this.game.add.group();
        this.game.stars = this.game.add.group();

        this.game.stars.enableBody = true;
        this.game.platforms.enableBody = true;
    },

    initMap: function(){
        this.game.add.sprite(0, 0, 'sky');
    },
    addMainPlayer: function(){

        var startX = 32;
        var startY = this.game.world.height - 150;

        this.player = new CharacterObj(this.game, 32, this.game.world.height - 150, true);
    },

    initPlatform: function(){
        this.ground = this.game.platforms.create(0, this.game.world.height - 32, 'ground');
        //  Scale it to fit the width of the this.game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);
        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;
    },

    initLedge: function(){
        //  Now let's create two ledges
        this.ledge = this.game.platforms.create(400, 350, 'ground');
        this.ledge.body.immovable = true;

        this.ledge = this.game.platforms.create(-150, 250, 'ground');
        this.ledge.body.immovable = true;
    },

    initStars: function(){
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            this.star = this.game.stars.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            this.star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            this.star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    },

    create: function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.initMap();
        this.setupSpriteGroups();

        this.initPlatform();
        this.initLedge();

        this.addMainPlayer();

        this.initStars();

        //  The score
        scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    },

    manageCollision: function(){
        this.game.physics.arcade.collide(this.player.sprite, this.game.platforms);
        this.game.physics.arcade.collide(this.game.stars, this.game.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.game.physics.arcade.overlap(this.player.sprite, this.game.stars, this.collectStar, null, this);

    }

    update: function(){
        this.manageCollision();
        this.player.manageMouvement();
    },
    collectStar: function(player, star){
        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
};

module.exports = Login;
