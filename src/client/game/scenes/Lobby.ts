import Phaser from "phaser"
import Panel from "../utils/panel"
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

  async create() {
    const self = this;

    this.panelGauche = new Panel("JOUEURS",['Choix en cours ! 0/4'], this, () => {})

    this.container = this.add.container(645, 0);

    this.personnages.forEach((element, idx) => {
      const img = self.add.image(0 + idx * 200, this.cameras.main.centerY, element).setData('actif', false).setAlpha(0.8).setInteractive().on('pointerdown', function() {
        self.room.send('etat', {pret: true, indexConfirmation: idx})
        console.log(`INDEX ${idx}`)
        console.log(this)
        this.setData('actif', true)
        this.setAlpha(1)
      }).on('pointerover', function(x, y) {
        if (!this.getData('actif')) {
          this.setAlpha(1)
        }
      }).on('pointerout', function() {
        if (!this.getData('actif')) {
          this.setAlpha(0.8)
        }
      })
      this.container.add([img])
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
      // room.onMessage('miseAjourListePret', (infos) => {
      //   self.container.getAll()[infos.index].setAlpha(1).setData('actif', true)
      // })


      room.onStateChange((changes: any) => {
        let joueursPresents = {}
        changes.joueurs.forEach((value, key) => {
          joueursPresents[key] = value
        })
        console.log(Object.keys(joueursPresents).length)
        // console.log(joueursPresents['bb'].pret)

        self.panelGauche.setTitre(`Joueurs : ${Object.keys(joueursPresents).length} / 4`)
        let contenu = []
        // Object.keys(joueursPresents).map(val => (contenu.push(val), console.log(val.concat(' PRET'))))
        Object.keys(joueursPresents).map(val => (contenu.push(val.concat(`${joueursPresents[val].pret ? ' PRET' : ' CHOIX EN COURS...'}`))))
        // console.log(joueursPresents)
        // texte.concat(this.contenu.text)
        // [Object.keys(joueursPresents)].map(val => [`${val}`]);
        self.panelGauche.setContenu(contenu)

        // const ancientext = text.text
        // // console.log(text.text)
        // if (`${Object.keys(presences).length}` != text.text) {
        //   // nouveautext = text.text
        //
        //   if (nouveautext != ancientext) {
        //     var newContent = [Object.keys(presences)].map(val => textListe.setText(val))
        //     text.setText(`Joueurs : ${Object.keys(presences).length} / 4`)
        //     // textListe.setText(liste)
        //     // console.log('mise a jjjouuur')
        //   }
        // }
      })





      // room.state.players.onAdd = (player, key) => {
      //     console.log(player, "has been added at", key);
      //
      //     // add your player entity to the game world!
      //
      //     // If you want to track changes on a child object inside a map, this is a common pattern:
      //     player.onChange = function(changes) {
      //         changes.forEach(change => {
      //             console.log(change.field);
      //             console.log(change.value);
      //             console.log(change.previousValue);
      //         })
      //     };
      //
      //     // force "onChange" to be called immediatelly
      //     player.triggerAll();
      // };
      //
      // room.state.players.onRemove = (player, key) => {
      //   console.log(player, "has been removed at", key);
      //
      //   // remove your player entity from the game world!
      // };









    })
    .catch((err) => {
      console.error(err)
    })
  }

  update() {}
}
