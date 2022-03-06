import Phaser from "phaser"

import * as Colyseus from "colyseus.js"
import { Client, RoomAvailable } from "colyseus.js";



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

    var content = [
      "Chargement des manoirs..."
    ];

    this.listeRoom = 0;
    this.listeLobby = []

    var graphics = this.make.graphics(this);

    graphics.fillStyle(0x000000);
    graphics.setAlpha(0.1)
    graphics.fillRect(0, 0, 320, window.innerHeight);

    var text = this.add.text(40, 100, content, { fontFamily: 'CustomFont' }).setOrigin(0);
    var titre = this.add.text(window.innerWidth/2, 100, 'Resident Streamer', { fontFamily: 'CustomFont' }).setOrigin(0.5).setFontSize(35);



// const client = new Client("ws://localhost:2567");
const lobby = await client.joinOrCreate("acceuil");

let allRooms: RoomAvailable[] = [];

lobby.onMessage("rooms", (rooms) => {
  allRooms = rooms;
  self.listeLobby = []

  allRooms.map(val => {
    self.listeLobby.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`)
  })

  text.setText(self.listeLobby)
  // self.listeLobby.
  // self.listeLobby = rooms

  // text.setText(self.listeLobby)

  console.log("tttttttttttouut")
  console.log(rooms)

// rooms.map(val => {
  // text.setText(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`).setDepth(3).setInteractive().on('pointerdown', () => (self.scene.start('Lobby', {salon: val.metadata.nomRoom})));
// })

// text.setText(rooms.map(val => [val.metadata.nomRoom]))


  // content.push(`${rooms[i].metadata.nomRoom} (${rooms[i].clients} / ${rooms[i].maxClients})`)
  // text.setText(rooms)

        // content = [];

        // for (var i=0; i<rooms.length; i++) {
          // console.log(rooms[i])
          // console.log(rooms[i].roomId)
          // content.push(`${rooms[i].metadata.nomRoom} (${rooms[i].clients} / ${rooms[i].maxClients})`)
          // let r = rooms[i].metadata.nomRoom
          // if (!content.length) {
            // text.setText(rooms).setDepth(3).setInteractive().on('pointerdown', () => (self.scene.start('Lobby', {salon: `yes`})));
          // }
          // self.scene.scene.events.off();
        // }


});

lobby.onMessage("+", ([roomId, room]) => {
  const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
  if (roomIndex !== -1) {
    allRooms[roomIndex] = room;

  } else {
    allRooms.push(room);
    // text.setText([room])

  }
  console.log("+++++++++")
  console.log(allRooms)


  self.listeLobby = []
  allRooms.map(val => {
  self.listeLobby.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`)
})

text.setText(self.listeLobby)


    // self.listeLobby.push(val.metadata.nomRoom)

  // text.setText(['+++', 'plus'])

  // allRooms.map(val => {
  //   content.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`).setDepth(3).setInteractive().on('pointerdown', () => (self.scene.start('Lobby', {salon: val.metadata.nomRoom})));
  // })
  // text.setText(content)

  // content = [];
  //
  // for (var i=0; i<allRooms.length; i++) {
  //   content.push(`${allRooms[i].metadata.nomRoom} (${allRooms[i].clients} / ${allRooms[i].maxClients})`)
  //   let r = allRooms[i].metadata.nomRoom
  //   if (!content.length) {
  //     text.setText(content).setDepth(3).setInteractive().on('pointerdown', () => (self.scene.start('Lobby', {salon: `yes`})));
  //   }
  //   // self.scene.scene.events.off();
  // }


});

lobby.onMessage("-", (roomId) => {
  allRooms = allRooms.filter((room) => room.roomId !== roomId);
  console.log("------------")
  console.log(allRooms)

  self.listeLobby = []
  allRooms.map(val => {
    self.listeLobby.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`)
  })

text.setText(self.listeLobby)
  // text.setText(['--------- ', 'moins'])
  // allRooms.map(val => {
  //   text.setText([`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`]).setDepth(3).setInteractive().on('pointerdown', () => (self.scene.start('Lobby', {salon: val.metadata.nomRoom})));
  // })
});

    // var afficheListeRooms = setInterval(() => {
    //   client.getAvailableRooms("lobby").then(rooms => {
    //     console.log(rooms.length);
    //     if (rooms.length !== this.listeRoom ) {
    //
    //       if (rooms.length === 0) {
    //         text.setText("Aucun manoirs créer")
    //       }
    //       content = [];
    //       for (var i=0; i<rooms.length; i++) {
    //         console.log(rooms[i])
    //         console.log(rooms[i].roomId)
    //         content.push(`${rooms[i].metadata.nomRoom} (${rooms[i].clients} / ${rooms[i].maxClients})`)
    //         let r = rooms[i].metadata.nomRoom
    //         // if (!content.length) {
    //         text.setText(content).setDepth(3).setInteractive().on('pointerdown', () => (self.scene.start('Lobby', {salon: `${r}`}), clearInterval(afficheListeRooms)));
    //         // }
    //         // self.scene.scene.events.off();
    //       }
    //       this.listeRoom++
    //     }
    //
    //   });
    //
    //   if (this.listeRoom == 0) {
    //     text.setText(["Aucun manoirs créer", "Créer en un !"])
    //   }
    // }, 1000);


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
            // clearInterval(afficheListeRooms);

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

update(sal, lol) {}
}
