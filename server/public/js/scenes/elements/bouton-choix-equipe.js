// export function Sasuke(el, up, top, halfHeight, halfWidth) {
//     var sasukeA = el.add.rectangle(up, top, 124, 248, 0x0ea733);
//     sasukeA.setInteractive({ useHandCursor: true }).on('pointerdown', (e) =>  (el.socket.emit("CHOIX EQUIPE", "SASUKE", "A")));
//     sasukeA.on('pointerover', (e) => { sasukeA.alpha = 0.5 });
//     sasukeA.on('pointerout', (e) => { sasukeA.alpha = 1});
//     var sasukeB = el.add.rectangle(up + 124, top, 124, 248, 0x0e88bd);
//     sasukeB.setInteractive({ useHandCursor: true }).on('pointerdown', () => el.socket.emit("CHOIX EQUIPE", "SASUKE", "B"));
//     sasukeB.on('pointerover', (e) => { sasukeB.alpha = 0.5});
//     sasukeB.on('pointerout', (e) => { sasukeB.alpha = 1});
//     el.add.text(up + 30, top - 30, [`VS`]).setDepth(300).setColor('#000000').setFontSize(47).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "black", 2, true, true);;
//     el.add.text(up - sasukeB.displayWidth / 2 + 30, halfHeight + 190, [`Arene SASUKE`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)
//     var sasukeTextA = el.add.text(up - sasukeA.displayWidth / 2 + 30, halfHeight + 260, [`0 joueur  |`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)
//     var sasukeTextB = el.add.text(up - sasukeB.displayWidth / 2 + 150, halfHeight + 260, [`0 joueur`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)
// }
//
export function Naruto(el, up, top, halfHeight, halfWidth, personnage) {
  var narutoA = el.add.rectangle(up, top, 124, 248, 0x0ea733);
  narutoA.setInteractive({ useHandCursor: true }).on('pointerdown', (e) =>  (
  el.scene.start('arene', {
    personnage: personnage,
    arene: "Naruto",
    equipe: "A"
  })
  ));
  narutoA.on('pointerover', (e) => { narutoA.alpha = 0.5 });
  narutoA.on('pointerout', (e) => { narutoA.alpha = 1});
  var narutoB = el.add.rectangle(up + 124, top, 124, 248, 0x0e88bd);
  narutoB.setInteractive({ useHandCursor: true }).on('pointerdown', () =>  (
  el.scene.start('arene', {
    personnage: personnage,
    arene: "Naruto",
    equipe: "B"
  })
  ));
  narutoB.on('pointerover', (e) => { narutoB.alpha = 0.5});
  narutoB.on('pointerout', (e) => { narutoB.alpha = 1});
  var r3 = el.add.text(up + 30, top - 30, [`VS`]).setDepth(300).setColor('#000000').setFontSize(47).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "black", 2, true, true);;
  el.add.text(up - narutoA.displayWidth / 2 + 30, halfHeight + 190, [`Arene Naruto`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)

  var narutoTextA = el.add.text(up - narutoA.displayWidth / 2 + 30, halfHeight + 260, [`0 joueur  |`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)
  var narutoTextB = el.add.text(up - narutoB.displayWidth / 2 + 150, halfHeight + 260, [`0 joueur`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)

}


export function Pikachu(el, up, top, halfHeight, halfWidth, personnage) {
  var pikachuA = el.add.rectangle(up, top, 124, 248, 0x0ea733);
  pikachuA.setInteractive({ useHandCursor: true }).on('pointerdown', (e) =>  (
  el.scene.start('arene', {
    personnage: personnage,
    arene: "Pikachu",
    equipe: "A"
  })
  ));
  pikachuA.on('pointerover', (e) => { pikachuA.alpha = 0.5 });
  pikachuA.on('pointerout', (e) => { pikachuA.alpha = 1});
  var pikachuB = el.add.rectangle(up + 124, top, 124, 248, 0x0e88bd);

  pikachuB.setInteractive({ useHandCursor: true }).on('pointerdown', () =>  (
  el.scene.start('arene', {
    personnage: personnage,
    arene: "Pikachu",
    equipe: "B"
  })
  ));
  pikachuB.on('pointerover', (e) => { pikachuB.alpha = 0.5});
  pikachuB.on('pointerout', (e) => { pikachuB.alpha = 1});
  var r3 = el.add.text(up + 30, top - 30, [`VS`]).setDepth(300).setColor('#000000').setFontSize(47).setFontFamily('Trebuchet MS').setColor('#6badce').setShadow(2, 2, "black", 2, true, true);;
  el.add.text(up - pikachuA.displayWidth / 2 + 30, halfHeight + 190, [`Arene Pikachu`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)

  var pikachuTextA = el.add.text(up - pikachuA.displayWidth / 2 + 30, halfHeight + 260, [`0 joueur  |`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)
  var pikachuTextB = el.add.text(up - pikachuB.displayWidth / 2 + 150, halfHeight + 260, [`0 joueur`]).setFontSize(27).setFontFamily('Trebuchet MS').setColor('#6badce').setDepth(1000)
}
