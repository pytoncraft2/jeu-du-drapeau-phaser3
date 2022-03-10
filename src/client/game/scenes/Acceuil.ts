import Phaser from "phaser"

import * as Colyseus from "colyseus.js"
import { RoomAvailable } from "colyseus.js";
import Panel from "../utils/panel";
import Titre from "../utils/titre";



export default class Acceuil extends Phaser.Scene {
  players: Phaser.GameObjects.Group
  session: string
  playersRef: any
  salon: string
  client!: Colyseus.Client
  room: Colyseus.Room<unknown>
  listeRoom: number
  listeLobby: string[]

  constructor() {
    super("Acceuil")
  }

  /**
  * Ajoute la couleur violette au canvas
  *
  * Si l'url contient du texte:
  * Redirection sur la page de lobby avec le nom passé en parametre de l'url
  * Sinon affiche directement la page d'acceuil
  */

  async create() {

    var div = document.getElementById('game');
    div.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"

    let salonURL = window.location.pathname.slice(1)
    if (salonURL != '') {
      this.scene.start('Lobby', {salon: `${salonURL}`})
    } else {
      this.afficheAcceuil()
    }
  }

  /**
  * Connexion au serveur
  * Affiche la modal de creationo/connexion à un lobby/salon
  * Mes à jour et affiche toute les secondes le tableau contenant la liste des lobby disponible
  */

  async afficheAcceuil() {

    this.client = new Colyseus.Client("ws://localhost:3000")
    const client = this.client

    this.listeRoom = 0;
    this.listeLobby = []

    this.add.text(window.innerWidth/2, 100, 'Resident Streamer', { fontFamily: 'CustomFontItalic' }).setOrigin(0.5).setFontSize(35);

    let intro = ["Combatter le plus rapidement possible les 5 Boss du manoirs.", "De 1 à 4 joueurs !", "__________________", "Lobby disponible", "__________________"];

    var text = new Panel("Bienvenue !",intro , this, () => {
      console.log('bonsoir')
    })


    const lobby = await client.joinOrCreate("acceuil");

    let allRooms: RoomAvailable[] = [];

    lobby.onMessage("rooms", (rooms) => {
      allRooms = rooms;
      this.miseAjourListe(self, allRooms, text, intro)
    });

    lobby.onMessage("+", ([roomId, room]) => {
      const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
      if (roomIndex !== -1) {
        allRooms[roomIndex] = room;
      } else {
        allRooms.push(room);
      }
      this.miseAjourListe(self, allRooms, text, intro)
    });

    lobby.onMessage("-", (roomId) => {
      allRooms = allRooms.filter((room) => room.roomId !== roomId);
      this.miseAjourListe(self, allRooms, text, intro)
    });

    var div = document.getElementById('game');
    // div.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"
    div.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"
    // div.style.background = "url(https://geeko-media.lesoir.be/wp-content/uploads/2018/08/Resident-Evil-2-remake-1068x580.png) no-repeat center/cover";
    const self = this;
    var element = this.add.dom(window.innerWidth / 2, window.innerHeight / 2).createFromCache('nameform');

    element.addListener('click');

    element.on('click', async function (event: Phaser.Input.Mouse.MouseManager) {

      if (event.target.name === 'loginButton')
      {
        var inputUsername = this.getChildByName('salon');

        //  Have they entered anything?
        if (inputUsername.value !== '')
        {
          //  Turn off the click events
          this.removeListener('click');

          this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 1000, ease: 'Power3' });
          this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 1000, ease: 'Power3',
          onComplete: async function ()
          {
            element.setVisible(false);
            const salon = inputUsername.value;
            lobby.leave()
            self.scene.start('Lobby', {salon: salon, id: false});
          }
        });
      }
      else
      {
        //  Flash the prompt
        this.scene.tweens.timeline({
          tweens: [{
            targets: element,
            x: element.x - 10,
            ease: 'Power1',
            duration: 50
          }],
          repeat: 4,
          yoyo: true
        });
      }
    }

  });

  this.tweens.add({
    targets: element,
    y: 300,
    duration: 3000,
    ease: 'Power3'
  });

}

miseAjourListe(self: any, allRooms: Object[]|string[], text: any, intro) {
  self.listeLobby = []
  allRooms.map((val: any) => {
    self.listeLobby.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`)
  })
  text.setContenu(intro.concat(self.listeLobby))
}

update() {}
}
