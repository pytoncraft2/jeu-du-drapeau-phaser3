function Animations(anims) {


  anims.create({
    key: 'attack',
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 5 }),
    frameRate: 6,
    repeat: 0
  });
  anims.create({
    key: "goback",
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'dos', start: 1, end: 7 }),
    frameRate: 7,
    repeat: 0
  });

  anims.create({
    key: "front",
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'face', start: 1, end: 5 }),
    frameRate: 6,
    repeat: 0
  });
  anims.create({
    key: "walk",
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 1, end: 5 }),
    frameRate: 5,
    repeat: 0
  });
  anims.create({
    key: "jump",
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'jump', start: 0, end: 5 }),
    frameRate: 7,
    repeat: 0
  });

  anims.create({
    key: "idle_walk",
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 5, end: 5 }),
    frameRate: 1,
    repeat: -1
  });

  anims.create({
    key: "idle_attack",
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 1 }),
    frameRate: 1,
    repeat: 0
  });

  anims.create({
    key: "run",
    frames: anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 4 }),
    frameRate: 6,
    repeat: -1
  })




}

export default Animations;
