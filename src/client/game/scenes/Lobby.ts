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

    this.panelGauche = new Panel("JOUEURS",['Alex32 - PRET', 'Jamie - choix en cours', 'lili - PRET'], this, () => {})

    this.container = this.add.container(645, 0);

    this.personnages.forEach((element, idx) => {
      const img = self.add.image(0 + idx * 200, this.cameras.main.centerY, element).setData('actif', false).setInteractive().on('pointerdown', function() {
        self.room.send('etat', {pret: true, indexConfirmation: idx})
        console.log(`INDEX ${idx}`)
        console.log(this)
        this.setAlpha(0.4)
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
      room.onMessage('miseAjourListePret', (infos) => {
        console.log("AAAAAAALL")
        console.log(self.container.getAll()[infos.index]);
        self.container.getAll()[infos.index].setAlpha(0.5)
        // self.panelGauche.addContenu([`${infos.id} Prêt !`])
        console.log(infos)
        console.log(infos.id)
        console.log(infos.index)

      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  update() {}
}
