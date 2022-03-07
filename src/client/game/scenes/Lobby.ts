import Phaser from "phaser"
import Button from "../utils/bouton"

import * as Colyseus from "colyseus.js"


/**
 * Equipe de 4 joueurs max qui REJOINT le lobby
 *
 */

export default class Lobby extends Phaser.Scene {
  private playersMessage: Phaser.GameObjects.Text;
  client!: Colyseus.Client
  session: string
  room: Colyseus.Room<unknown>
  salon: string
  personnages: string[]
  player: any
  joueursPresents: string

  constructor() {
    super("Lobby")
  }

  init(salon: any) {
    this.salon = salon.salon
    this.personnages = ['fakhear', 'fakhear', 'fakhear', 'fakhear'];
  }

  preload() {
    this.load.html('nameform', './loginform.html');
  }

  async create() {

    const self = this;
    // this.playersMessage = this.add
    // .text(400, 300, `SUPER LOBBY`, { fontFamily: 'CustomFont' })
    // .setOrigin(0.5)
    // .setInteractive();

    var titre = this.add.text(window.innerWidth/2, 100, `Lobby : ${this.salon} `, { fontFamily: 'CustomFont' }).setOrigin(0.5).setFontSize(35);

    const button = new Button(window.innerWidth / 2, window.innerHeight - 100, 'Choisissez un personnage !', this, () => button.setText('Confirmer Fakhear ?') );
    // button.setText('')
    var container = this.add.container();

    var content = [
      "Joueurs dans le lobby : "
    ];
    var listeTexte = ['- Aucun joueurs 👻']

    var text = this.add.text(160, 100, content, { fontFamily: 'CustomFont', wordWrap: { width: 310 } }).setOrigin(0).setFontSize(20);
    var textListe = this.add.text(160, 130, listeTexte, { fontFamily: 'CustomFont', wordWrap: { width: 310 } }).setOrigin(0).setFontSize(20);
    // var text = this.add.text(160, 280, content, { fontFamily: 'Arial', color: 'white', wordWrap: { width: 310 } }).setOrigin(0);


    // var r3 = this.add.rectangle(600, 200, 148, 148, 0xff33cc).setAlpha(0.2)

    // r3.setStrokeStyle(2, 0x1a65ac);
    // r3.setStrokeStyle(4, 0xefc53f);

    var x = 490;
    var y = 700;
    var up = 0;

    let groupeEllipse = this.add.group()

    this.personnages.forEach((item, i) => {
      // this.player = 'player' + i.toString();
      this.player = self.add.image(x + up, y, item).setOrigin(0.5, 1);
      // this.player.setData('focus', false)
      up += 200;
      let ellipse = self.add.ellipse(x + up - 200, y - 10, 200, 35, 0x00000).setAlpha(0.3).setDepth(-1).setData('focus', false);
      groupeEllipse.add(ellipse)
      let textInfo = self.add.text(x+up - 200, y - 10, `${this.player.frame.texture.key}`).setOrigin(0.5, 0.5).setPadding(10).setStyle({ backgroundColor: '#111' }).setPosition(x+up - 190, y - this.player.displayHeight - 30)

      // const ok = this.scene.add.text(this.x + this.displayWidth, this.y, 'OK', { fontFamily: 'CustomFont' })
// .setOrigin(0.5)
// .setPadding(10)
// .setStyle({ backgroundColor: '#111' })

      // text.setOrigin(0.5, 0.5);

      // container.add(this.player);
      // container.add();
      // container.setScale(4);
        container.add(this.player)

      this.player.setInteractive().on('pointerdown', function() {
        groupeEllipse.getChildren().forEach(element => {
  if (element.getData('focus') === true) {
  element.setAlpha(1)
    element.setData('focus', false)
    // element.setAlpha(0.2)
  }
});

        // r3.setPosition(this.x, this.y)
        // container.add(r3)
        container.add(textInfo)
        this.setData('focus', true)
        // ellipse.setFillStyle(0xffa500).setAlpha(1)
        button.setText(`Confirmer ${this.frame.texture.key} ?`)
        button.pointerdown(() => {
          button.setText(`VOUS ÊTES PRÊT !`)
          ellipse.setFillStyle(0x008000).setAlpha(1)
          textInfo.setText(`${self.session} Prêt !`)
        })



        // .setOrigin(0.5)
// .setPadding(10)
// .setStyle({ backgroundColor: '#111' })

        // console.log(this)
        // .setPosition(x, y)
        // const confirme = new Button(this.player.x , this.player.y, 'Prêt !', this, () => button.setText('Confirmer Fakhear ?') )

      }).on('pointerover', function() {
        this.setAlpha(0.8)
      }).on('pointerout', function () {
        this.setAlpha(1)
      });


      // container.add(this.player);
      // container.displayHeight

    });

//     this.tweens.add({
//     targets: container,
//     angle: 360,
//     duration: 6000,
//     yoyo: true,
//     repeat: -1
// });


    this.client = new Colyseus.Client("ws://localhost:3000")
    const salon = this.salon
    const client = this.client
    var nouveautext;
    var liste = []

      client
      .joinOrCreate("lobby", { salon })
      .then((room) => {

        self.room = room
        console.log("RRRRRRRRRRRRRROOOOM")
        console.log(room)
        self.session = room.sessionId
        console.log("SALON LOBBY REJOINT & CONNECTÉ OK");


        // self.playersMessage.setInteractive().on('pointerdown', () => {
        //   room.leave();
        //   self.scene.start('Jeu_01',{salon: salon});
        // });

        room.onStateChange((changes: any) => {
          let presences = {}
          changes.presences.forEach((value, key) => {
            presences[key] = value
          })
          console.log(Object.keys(presences).length)

          const ancientext = text.text
          // console.log(text.text)
          if (`${Object.keys(presences).length}` != text.text) {
            // nouveautext = text.text

            if (nouveautext != ancientext) {
              var newContent = [Object.keys(presences)].map(val => textListe.setText(val))
              console.log(Object.keys(presences))
              text.setText(`Joueurs : ${Object.keys(presences).length} / 4 ${self.pret ? '(Prêt)' : ''}`)
              // textListe.setText(liste)
              // console.log('mise a jjjouuur')
            }
          }

        //   self.patchPlayer({
        //     presences: presences,
        //     presenceList: Object.keys(presences),
        //   })
        })
      })
      .catch((err) => {
        console.error(err)
      })
    // }

  }

  update() {}
}
