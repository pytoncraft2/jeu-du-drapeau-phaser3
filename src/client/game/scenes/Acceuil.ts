import Phaser from "phaser"

export default class Acceuil extends Phaser.Scene {
  players: Phaser.GameObjects.Group
  session: string
  playersRef: any
  salon: string

  constructor() {
    super("Acceuil")
  }

  preload() {
    this.load.html('nameform', './loginform.html');
    // this.load.atlas('fakhear', '/assets/personnages/fakhear/fakhear.png', 'assets/personnages/fakhear/fakhear_atlas.json');
  }

  create() {
    var div = document.getElementById('game');
    // div.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"
    // div.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"
    div.style.background = "url(https://geeko-media.lesoir.be/wp-content/uploads/2018/08/Resident-Evil-2-remake-1068x580.png) no-repeat center/cover";
    // div.style.background = "url(data:image/jpeg;base64,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)"
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

          this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });
          this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
          onComplete: async function ()
          {
            element.setVisible(false);
            const salon = inputUsername.value;
            self.scene.start('Lobby', {salon: salon});
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
