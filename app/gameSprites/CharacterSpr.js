"use strict";

var CharacterSpr = function(game, x, y , isCollisionEnabled) {
  Phaser.Sprite.call(this, game, x, y, 'dude');
  if(isCollisionEnabled){
      this.enableCollision();
  }
  this.setupAnimations();
};

CharacterSpr.prototype = Object.create(Phaser.Sprite.prototype);
CharacterSpr.prototype.constructor = CharacterSpr;

CharacterSpr.prototype.enableCollision = function() {
    this.game.physics.arcade.enable(this);
    this.body.fixedRotation = true;
};

CharacterSpr.prototype.setupAnimations = function() {
    this.anchor.setTo(0.5, 0.5);

    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

};

CharacterSpr.prototype.walkLeft = function(){
    this.body.velocity.x = -150;
    this.animations.play("left");
};

CharacterSpr.prototype.walkRight = function(){
    this.body.velocity.x = 150;
    this.animations.play("right");
};

CharacterSpr.prototype.jump = function(){
    this.body.velocity.y = -250;
};

CharacterSpr.prototype.stopAnimation = function(){
    this.body.velocity.x = 0;
    this.animations.stop();
    this.frame = 4;
};

module.exports = CharacterSpr;
