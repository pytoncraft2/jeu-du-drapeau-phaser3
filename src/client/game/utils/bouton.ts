export default class Button {
  private button: any;
  private tweens: any;
  private animationBouton: any;
    constructor(x: number, y: number, label: string, scene: Phaser.Scene, callback: CallableFunction) {

      this.tweens = scene.tweens


        this.button = scene.add.text(x, y, label, { fontFamily: 'CustomFontItalic' })
            .setOrigin(0.5)
            .setPadding(15)
            .setStyle({ backgroundColor: '#00000059' })
            .setInteractive({ useHandCursor: true })
            .setFontSize(33)
            .on('pointerdown', () => callback())


            this.animationBouton = scene.tweens.add({
              targets: this.button,
              alpha: 0.4,
              yoyo: true,
              repeat: -1,
              paused: true,
              ease: 'Sine.easeInOut'
            });

            // .on('pointerover', () => this.button.setText('         JOUER !          '))
            // .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));
    }

    setText(text: string[]|string) {
      this.button.setText(text).setOrigin(0.5)
      console.log("zzzzzzzzzzz")
    }

    setPosition(x: number, y: number) {
      this.button.setPosition(x, y)
    }

    pointerdown(callback: CallableFunction) {
      this.button.setInteractive({ useHandCursor: true }).on('pointerdown', () => callback())
    }

    animationStart() {
      console.log(this.tweens.scene.bouton)
      this.animationBouton.play()
    }

    animationStop() {
      this.animationBouton.resume();
    }
}
