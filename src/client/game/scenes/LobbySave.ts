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
    var container = this.add.container(window.innerWidth /5, window.innerHeight /9);

    var content = [
      "Joueurs dans le lobby : "
    ];
    var listeTexte = ['- Aucun joueurs 👻']

    var text = this.add.text(160, 100, content, { fontFamily: 'CustomFont', wordWrap: { width: 310 } }).setOrigin(0).setFontSize(20);
    var textListe = this.add.text(160, 130, listeTexte, { fontFamily: 'CustomFont', wordWrap: { width: 310 } }).setOrigin(0).setFontSize(20);
    // var text = this.add.text(160, 280, content, { fontFamily: 'Arial', color: 'white', wordWrap: { width: 310 } }).setOrigin(0);


    var x = 290;
    var y = 600;
    var up = 0;

    this.personnages.forEach((item, i) => {
      this.player = 'player' + i.toString();
      this.player = self.add.image(x + up, y, item).setOrigin(0.5, 1);
      up += 200;

      this.player.setInteractive().on('pointerdown', function() {
        this.setAlpha(0.6)
        button.setText(`Confirmer ${this.frame.texture.key} ?`)

        const ok = this.scene.add.text(this.x, y, 'OK', { fontFamily: 'CustomFont' })
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setPosition(x, y)
        // self.add.text(this.getTopCenter().x + 350, this.getTopCenter().y, `${self.session}`)
        // const confirme = new Button(this.player.x , this.player.y, 'Prêt !', this, () => button.setText('Confirmer Fakhear ?') )
      });

      container.add(this.player);

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
              text.setText(`Joueurs : ${Object.keys(presences).length} / 4`)
            }
          }
        })
      })
      .catch((err) => {
        console.error(err)
      })
    // }

  }

  update() {}
}
