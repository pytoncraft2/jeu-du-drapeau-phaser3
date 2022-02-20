import Phaser from "phaser"

import * as Colyseus from "colyseus.js"
import { deepEqual } from "../utils/index"

export default class Jeu_01 extends Phaser.Scene {
  client!: Colyseus.Client
  players: Phaser.GameObjects.Group
  session: string
  playersRef: any
  salon: any
  keyboard!: any
  room: Colyseus.Room<unknown>
  prevInputs: { up: boolean; right: boolean; left: boolean; down: boolean }
  private playersMessage: Phaser.GameObjects.Text;

  constructor() {
    super("Jeu_01")
  }

  init(salon): void {
    this.salon = salon.salon
  }

  preload() {
    this.load.html('nameform', './loginform.html');
  }

  create() {

    const self = this;
    this.players = this.add.group()
    this.playersRef = {}
    this.keyboard = this.input.keyboard.addKeys("up,right,left,down")
    this.playersMessage = this.add
  .text(400, 300, `Players connected: 123`)
  .setOrigin(0.5);

    this.client = new Colyseus.Client("ws://localhost:3000")
    const client = this.client
    console.log("JEU 01 CONNECTÉ");



//             var element = this.add.dom(400, 600).createFromCache('nameform');
//
//         console.log(element);
//
//         // element.setPerspective(800);
//
// element.addListener('click');
//
// element.on('click', async function (event) {
//
//   console.log("CLLIICK");
//
//     if (event.target.name === 'loginButton')
//     {
//         var inputUsername = this.getChildByName('salon');
//   console.log("LOGIN BOUTON");
//
//         //  Have they entered anything?
//         if (inputUsername.value !== '')
//         {
//             //  Turn off the click events
//             this.removeListener('click');
//
//             // await self.server.join(inputUsername.value);
//             // console.log("INNPUUUT");
//             console.log(inputUsername.value);
//
//
//             //  Tween the login form out
//             this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
//
//             this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
//                 onComplete: async function ()
//                 {
//                     element.setVisible(false);
//
                    const salon = this.salon;
                    client
                      .joinOrCreate("game_instance", { salon })
                      .then((room) => {
                        self.room = room
                        self.session = room.sessionId
                        room.onStateChange((changes: any) => {
                          let presences = {}
                          changes.presences.forEach((value, key) => {
                            presences[key] = value
                          })
                          self.patchPlayer({
                            presences: presences,
                            presenceList: Object.keys(presences),
                          })
                        })
                      })
                      .catch((err) => {
                        console.error(err)
                      })
//
//
//                     // let res = await this.client.getAvailableRooms("lobby").then(rooms => {
//                       // return rooms;
//                     // });
//
//                     // let rooms = await self.server.listeRoom();
//                     // rooms.forEach((room) => {
//                       // self.add.text(55, 80, `${room.name}: ${room.roomId}`).setInteractive();
//                     // });
//
//                     // self.listeRoom = liste;
//                     // console.log(liste);
//
//                 }
//             });
//
//             //  Populate the text with whatever they typed in as the username!
//             // self.playersMessage.setText("Lobby de l'arène " + inputUsername.value);
//         }
//         else
//         {
//           //  Flash the prompt
//           this.scene.tweens.timeline({
//             tweens: [{
//               targets: element,
//               x: element.x - 10,
//               ease: 'Power1',
//               duration: 50
//             }],
//             repeat: 4,
//             yoyo: true
//           });
//         }
//     }
//
// });
// element.setDepth(900)
//
//
//    this.tweens.add({
//        targets: element,
//        y: 300,
//        duration: 3000,
//        ease: 'Power3'
//    });

    // }, this);


    this.prevInputs = {
      up: false,
      right: false,
      left: false,
      down: false,
    }
  }

  patchPlayer(list: any) {
    // create instance of all presence

    list.presenceList.map((item, idx) => {
      if (this.playersRef[item] === undefined) {
        const x = list.presences[item].x
        const y = list.presences[item].y
        const player = this.add
          .sprite(x, y, "")
          .setData({ ClientId: list.presenceList[idx] })
        this.players.add(player)
        this.playersRef[item] = player
      } else {
        this.playersRef[item].x = list.presences[item].x
        this.playersRef[item].y = list.presences[item].y
      }
    })

    // deleted non existance

    this.players.children.iterate((child) => {
      if (list.presences[child.data.values.ClientId] === undefined) {
        this.playersRef[child.data.values.ClientId].destroy(true)
        delete this.playersRef[child.data.values.ClientId]
      }
    })
  }

  update() {
    if (this.room) {
      const { up, right, left, down } = this.keyboard

      const inputs = {
        up: up.isDown ? true : false,
        right: right.isDown ? true : false,
        left: left.isDown ? true : false,
        down: down.isDown ? true : false,
      }

      if (!deepEqual(inputs, this.prevInputs)) {
        this.prevInputs = inputs
        this.room.send("inputs", inputs)
      }
    }
  }
}
