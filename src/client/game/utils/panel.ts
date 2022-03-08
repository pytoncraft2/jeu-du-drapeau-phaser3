export default class Panel {
  private contenu: any;

  constructor(titre = '', contenu: string[], scene, callback) {
    var graphics = scene.make.graphics(scene);
    graphics.fillStyle(0x000000);
    graphics.setAlpha(0.1)
    graphics.fillRect(0, 0, 320, window.innerHeight);

    titre = scene.add.text(40, 50, titre, { fontFamily: 'CustomFont' }).setOrigin(0).setFontSize(29);
    this.contenu = scene.add.text(40, 100, contenu, { fontFamily: 'CustomFont' }).setOrigin(0).setFontSize(20);
  }

  setContenu(texte: string[]|String) {
    this.contenu.setText(texte)
  }
}
