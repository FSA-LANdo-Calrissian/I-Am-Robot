import Phaser from 'phaser';

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setAllowGravity(false);
    this.messageDisplayed = false;
    this.touching = false;
  }

  displayTooltip() {
    if (!this.messageDisplayed) {
      this.messageDisplayed = true;
      // this.scene.tutorialText = this.scene.add.text(
      //   this.x - 10,
      //   this.y - 10,
      //   'Hit spacebar to interact',
      //   { fontSize: 8, wordWrap: { width: 60 } }
      // );
      this.scene.tutorialText = this.scene.add
        .image(this.x - 10, this.y - 10, 'interact')
        .setScale(0.3);
      this.scene.events.emit('dialogue');
    }
  }

  update() {
    let touching = !this.body.touching.none;
    let wasTouching = !this.body.wasTouching.none;

    if (!touching && wasTouching && this.messageDisplayed) {
      this.scene.tutorialText.destroy();
      this.messageDisplayed = false;
    }
  }
}
