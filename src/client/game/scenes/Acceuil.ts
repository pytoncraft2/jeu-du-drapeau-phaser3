import Phaser from "phaser"

import * as Colyseus from "colyseus.js"


export default class Acceuil extends Phaser.Scene {
  players: Phaser.GameObjects.Group
  session: string
  playersRef: any
  salon: string
  client!: Colyseus.Client
  room: Colyseus.Room<unknown>
  listeRoom: number



  constructor() {
    super("Acceuil")
  }

  preload() {
    this.load.html('nameform', './loginform.html');
    // this.load.atlas('fakhear', '/assets/personnages/fakhear/fakhear.png', 'assets/personnages/fakhear/fakhear_atlas.json');
  }

  async create() {
    this.client = new Colyseus.Client("ws://localhost:3000")
    const client = this.client

    client
    .joinOrCreate("acceuil")
    .then((room) => {
      self.room = room
      self.session = room.sessionId
      console.log("SALON ACCEUIL REJOINT & CONNECTÉ OK");
    })
    .catch((err) => {
      console.error(err)
    })

    var content = [
      "Chargement des manoirs..."
    ];

    this.listeRoom = 0;

var graphics = this.make.graphics();

graphics.fillStyle(0xffffff);
graphics.fillRect(152, 133, 320, 250);

var text = this.add.text(160, 280, content, { fontFamily: 'Arial', color: 'white', wordWrap: { width: 310 } }).setOrigin(0);

var afficheListeRooms = setInterval(() => {
  client.getAvailableRooms("lobby").then(rooms => {
    console.log(rooms.length);
    if (rooms.length !== this.listeRoom ) {

      if (rooms.length === 0) {
        text.setText("Aucun manoirs créer")
      }
      content = [];
      for (var i=0; i<rooms.length; i++) {
        console.log(rooms[i])
        console.log(rooms[i].roomId)
        content.push(rooms[i].metadata.nomRoom)
        let r = rooms[i].metadata.nomRoom
        // if (!content.length) {
          text.setText(content).setDepth(3).setInteractive().on('pointerdown', () => (self.scene.start('Lobby', {salon: `${r}`}), clearInterval(afficheListeRooms)));
        // }
        // self.scene.scene.events.off();
      }
      this.listeRoom++
    }

  });

  if (this.listeRoom == 0) {
    text.setText("Aucun manoirs créer")
  }
}, 1000);


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
            clearInterval(afficheListeRooms);

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
update() {}
}
