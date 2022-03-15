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
  client!: Colyseus.Client
  session: string
  room: Colyseus.Room<unknown>
  salon: string
  personnages: string[]
  player: any
  joueursPresents: string
  container: Phaser.GameObjects.Container
  panelGauche: any
  listeJoueur: Object
  personnageChoisie: string = "fakhear"
  bouton: any

  constructor() {
    super("Lobby")
  }

  init(salon: any) {
    this.salon = salon.salon
    this.personnages = ['fakhear', 'akhizonah', 'huzounet', 'fakhear'];
  }

  preload() {
    this.load.html('nameform', './loginform.html');
  }


  /**
   * copieUrl - Copie l'url dans le presse papier
   */
  copieUrl() {
    let url = `${window.location.protocol}//${document.location.hostname}:${document.location.port}/${this.salon}`
    navigator.clipboard.writeText(url).then(function() {
      console.log(`${url} copié!`);
    }, function() {
      console.log(`${url} non copié!`);
    });
  }



  /**
   * async create - Creation et Initialisation des textes, liste d'images de personnages
   * et activation de l'ineraction avec Phaser
   */
  async create() {


    const self = this;

    this.panelGauche = new Panel("JOUEURS: 0/4",['Choisissez un personnage !'], this, () => {})

    this.listeJoueur = {
      0: self.add.text(645, 689 , [''], { fontFamily: 'CustomFontNormal' }).setFontSize(25).setAlpha(0.5).setOrigin(0.5).setDepth(3),
      1: self.add.text(845, 689 , [''], { fontFamily: 'CustomFontNormal' }).setFontSize(25).setAlpha(0.5).setOrigin(0.5).setDepth(3),
      2: self.add.text(1045, 689 , [''], { fontFamily: 'CustomFontNormal' }).setFontSize(25).setAlpha(0.5).setOrigin(0.5).setDepth(3),
      3: self.add.text(1245, 689, [''], { fontFamily: 'CustomFontNormal' }).setFontSize(25).setAlpha(0.5).setOrigin(0.5).setDepth(3)
    }

    new Titre(window.innerWidth/2, 100, `Lobby : ${this.salon}`, this, () => this.copieUrl())

    this.bouton = new Button(window.innerWidth / 2, window.innerHeight - 100, 'Choisissez un personnage !', this, () => {
      this.commencerJeu()
    });

    const listeIndex = []

    this.container = this.add.container(645, 0);
    await this.connexion()

    this.personnages.forEach((element, idx) => {
      const img = self.add.image(0 + idx * 200, this.cameras.main.centerY, element)
      .setData('actif', false)
      .setAlpha(0.8)
      .setInteractive(({ useHandCursor: true }))
      .on('pointerdown', function() {
        listeIndex.push(idx)
        self.personnageChoisie = `${this.frame.texture.key}`
        self.container.iterate(function(el: any) {
              el.setAlpha(0.3)
              el.setData('actif', false)
        });

        self.room.send('etatJoueur', {
          pret: true,
          indexConfirmation: idx,
          ancienIndexConfirmation: listeIndex[listeIndex.length - 2]
        })
        self.bouton.setText(`JOUER !`)
        this.setData('actif', true)
        this.setAlpha(1)
        ellipse.setAlpha(0.6)
        ellipse.setData('actif', true)
      }).on('pointerover', function() {
        if (!this.getData('actif')) {
          this.setAlpha(1)
          ellipse.setAlpha(0.6)
        }
      }).on('pointerout', function() {
        if (!this.getData('actif')) {
          this.setAlpha(0.6)
          ellipse.setAlpha(0.3)
        }
      })
      const ellipse = self.add.ellipse(img.x, img.y + img.displayHeight / 2 - 10, 200, 35, 0x00000).setAlpha(0.3).setDepth(-1);
      this.container.add([img, ellipse])
    });

  }



  /**
   * async connexion - Connexion au Lobby et mise à jour des donnes selon les changement du serveur
   */
  async connexion() {
    const self = this
    this.client = new Colyseus.Client("ws://localhost:3000")
    const salon = this.salon
    const client = this.client


    await client
    .joinOrCreate("lobby", { salon })
    .then((room) => {
      self.room = room
      self.session = room.sessionId

      room.onStateChange((changes: any) => {
        let joueursPresents = {}
        let contenu = []

        changes.joueurs.forEach((value: any, key: any) => {
          joueursPresents[key] = value
        })

        changes.listeJoueurIndex.forEach((listeID: string, idx: any) => {
          let obj = JSON.parse(listeID)
          for (const [key, value] of Object.entries(obj[idx])) {
            if (value) {
              this.listeJoueur[key].setText(value)
            } else {
              this.listeJoueur[key].setText('')
            }
          }
        })

        Object.keys(joueursPresents).map(val => {
          contenu.push(val.concat(`${joueursPresents[val].pret ? '  ✅ PRET !' : ' 🔴 CHOIX EN COURS...'} ${changes.proprietaire[0] == val ? '👑' : ''}`))
        })

        self.panelGauche.setTitre(`Joueurs : ${Object.keys(joueursPresents).length} / 4`)
        const tout_le_monde_est_pret = Object.keys(joueursPresents).filter((item: any) => joueursPresents[item].pret == true).length == Object.keys(joueursPresents).length; // 6

        if (tout_le_monde_est_pret)  {
          self.bouton.setText(`JOUER !`)
        } else {
          self.bouton.setText(`Des joueurs ne sont pas prêt !`)
        }
        self.panelGauche.setContenu(contenu)
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  commencerJeu() {
    this.room.leave()
    this.scene.start('Jeu_01', {
      salon: this.salon,
      personnage: this.personnageChoisie
    });
  }

  update() {}
}
