export default class Titre {
  private titre: any;
  private miniTitre: any
    constructor(x, y, label, scene, callback) {
      this.miniTitre = scene.add.text(x, y + 50,
        'Cliquez pour Copier et partager !', {
        fontFamily: 'CustomFontItalic',
      })
      .setFontSize(25)
      .setAlpha(0.5)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => (this.miniTitre.setText('Lien copié !'), callback()))
      .on('pointerover', () => this.miniTitre.setAlpha(0.8))
      .on('pointerout', () => this.miniTitre.setAlpha(0.5));

      this.titre = scene.add.text(x, y, label, { fontFamily: 'CustomFontNormal' })
      .setOrigin(0.5)
      .setFontSize(55)
      .setDepth(100)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => (this.miniTitre.setText('Lien copié !'), callback()))
      .on('pointerover', () => this.titre.setShadow(2, 2, '#111', 2, true, true))
      .on('pointerout', () => this.titre.setShadow(0, 0, '#111', 4, true, true));
    }
}
