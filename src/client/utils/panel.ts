export default class Panel {
  private contenu: any;
  private titre: Phaser.GameObjects.Text;

  constructor(titre = '', contenu: string[], scene: Phaser.Scene, callback: CallableFunction) {
    this.titre = scene.add.text(20, 50, titre, { fontFamily: 'CustomFontNormal' }).setOrigin(0).setFontSize(39);
    this.contenu = scene.add.text(16, 100, contenu, { fontFamily: 'CustomFontItalic', wordWrap: { width: 300 }}).setOrigin(0).setFontSize(24);
  }

  setContenu(texte: string[]|String) {
    this.contenu.setText(texte)
  }

  addContenu(texte: string[]|String) {
    // return this.contenu.concat(texte)
    this.setContenu(texte.concat(this.contenu.text))
  }

  setTitre(texte: any) {
    this.titre.setText(texte)
  }

  getContenu() {
    return this.contenu;
  }
}
