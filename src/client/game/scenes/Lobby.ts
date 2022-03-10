import Phaser from "phaser"
import Panel from "../utils/panel"
import Button from "../utils/bouton"
import Titre from "../utils/titre"
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
  container: Phaser.GameObjects.Container
  panelGauche: any

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

  copieUrl() {
    let url = document.location.href
    navigator.clipboard.writeText(url).then(function() {
      console.log(`${url} copié!`);
    }, function() {
      console.log(`${url} non copié!`);
    });
  }

  async create() {
    const self = this;

    this.panelGauche = new Panel("JOUEURS: 0/4",['Choisissez un personnage !'], this, () => {})

    let titre = new Titre(window.innerWidth/2, 100, `Lobby : ${this.salon}`, this, () => this.copieUrl())

    const button = new Button(window.innerWidth / 2, window.innerHeight - 100, 'Choisissez un personnage !', this, () => null );

    this.container = this.add.container(645, 0);

    this.personnages.forEach((element, idx) => {
      const img = self.add.image(0 + idx * 200, this.cameras.main.centerY, element)
      .setData('actif', false)
      .setAlpha(0.8)
      .setInteractive(({ useHandCursor: true }))
      .on('pointerdown', function() {
        self.container.iterate(function(el) {
              el.setAlpha(0.3)
              el.setData('actif', false)
        });

        self.room.send('etatJoueur', {
          pret: true,
          indexConfirmation: idx
        })
        button.setText(`JOUER !`)
        this.setData('actif', true)
        this.setAlpha(1)
        // ellipse.setAlpha(0.6)
        // ellipse.setData('actif', true)
      }).on('pointerover', function(x, y) {
        if (!this.getData('actif')) {
          this.setAlpha(1)
          // ellipse.setAlpha(0.6)
        }
      }).on('pointerout', function() {
        if (!this.getData('actif')) {
          this.setAlpha(0.6)
          // ellipse.setAlpha(0.3)
        }
      })
      // const ellipse = self.add.ellipse(img.x, img.y + img.displayHeight / 2 - 10, 200, 35, 0x00000).setAlpha(0.3).setDepth(-1);
      // const texte = self.add.text(img.x, img.y + img.displayHeight / 2 + 30, [''], { fontFamily: 'CustomFontNormal' }).setFontSize(20).setAlpha(0.5).setOrigin(0.5)
      this.container.add([img/*, ellipse, texte*/])
    });

    this.connexion()

  }


  async connexion() {
    const self = this
    this.client = new Colyseus.Client("ws://localhost:3000")
    const salon = this.salon
    const client = this.client

    client
    .joinOrCreate("lobby", { salon })
    .then((room) => {
      self.room = room
      self.session = room.sessionId
      console.log(`Salon lobby ${salon} rejoint !`)

      room.onStateChange((changes: any) => {
        let joueursPresents = {}
        changes.joueurs.forEach((value, key) => {
          joueursPresents[key] = value
        })
        self.panelGauche.setTitre(`Joueurs : ${Object.keys(joueursPresents).length} / 4`)
        let contenu = []
        Object.keys(joueursPresents).map(val => {
          contenu.push(val.concat(`${joueursPresents[val].pret ? '  ✅ PRET !' : ' 🔴 CHOIX EN COURS...'}`))
        })
        self.panelGauche.setContenu(contenu)
        // self.container.iterate(function() {
          // this.texte.setText('coucou')
          console.log(Object.keys(joueursPresents))
          Object.keys(joueursPresents).map(val => {
            if (joueursPresents[val].indexConfirmation !== -1) {
            // var children = self.container.getAll()[joueursPresents[val].indexConfirmation].setAlpha(0);
            var imgs = self.container.getAll()[joueursPresents[val].indexConfirmation] as any;

            if (!imgs.texte) {
              imgs.texte = self.add.text(imgs.x, imgs.y + imgs.displayHeight / 2 + 30, [val], { fontFamily: 'CustomFontNormal' }).setFontSize(20).setAlpha(0.5).setOrigin(0.5)
            } else {
              imgs.texte.setText([imgs.texte.text])
              // [val.concat(imgs.texte ? 'oui' : 'non')]
              // imgs.
            }
            // console.log(val.length == 1 ? val : (val.push()))
            // val.forEach(element => {
            //
            // });

            console.log('teexxxte')
            console.log(imgs.texte)
            console.log('valll')
            console.log(val)
            self.container.add([imgs.texte])
          }
            // console.log(children)
            // contenu.push(val.concat(`${joueursPresents[val].indexConfirmation ? '  ✅ PRET !' : ' 🔴 CHOIX EN COURS...'}`))
            // console.log(joueursPresents[val].indexConfirmation)
          })
        // })
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  update() {}
}
