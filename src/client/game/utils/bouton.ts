export default class Button {
  private button: any;
    constructor(x, y, label, scene, callback) {
        this.button = scene.add.text(x, y, label, { fontFamily: 'CustomFont' })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => this.button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));
    }

    setText(text) {
      this.button.setText(text).setOrigin(0.5)
      console.log("zzzzzzzzzzz")
    }

    setPosition(x, y) {
      this.button.setPosition(x, y)
    }
}

class ConfirmButton {
  private button: any;
  constructor(x, y, label, scene, callback) {
    this.button = scene.add.text(x, y, label, { fontFamily: 'CustomFont' })
    .setOrigin(0.5)
    .setPadding(10)
    .setStyle({ backgroundColor: '#111' })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => callback())
    .on('pointerover', () => this.button.setStyle({ fill: '#008000' }))
    .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));
  }
}
