export default class Button {
  private button: any;
    constructor(x: number, y: number, label: string, scene: Phaser.Scene, callback: CallableFunction) {
        this.button = scene.add.text(x, y, label, { fontFamily: 'CustomFontItalic' })
            .setOrigin(0.5)
            .setPadding(15)
            .setStyle({ backgroundColor: '#00000059' })
            .setInteractive({ useHandCursor: true })
            .setFontSize(33)
            .on('pointerdown', () => callback())
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
}
