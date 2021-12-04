function Animations(anims) {

  anims.create({
  key: "saut",
  frames: anims.generateFrameNames('dessinatrice1', { prefix: 'jumpface', start: 0, end: 5 }),
  frameRate: 6,
  repeat: -1
})



anims.create({
  key: 'attack',
  frames: anims.generateFrameNames('dessinatrice1', { prefix: 'positiona', start: 0, end: 5 }),
  frameRate: 6,
  yoyo: true,
  repeat: 0
});
anims.create({
  key: "goback",
  frames: anims.generateFrameNames('dessinatrice1', { prefix: 'dos', start: 0, end: 6 }),
  frameRate: 7,
  repeat: 0
});

anims.create({
  key: "front",
  frames: anims.generateFrameNames('dessinatrice1', { prefix: 'face', start: 0, end: 5 }),
  frameRate: 6,
  repeat: 0
});
anims.create({
  key: "walk",
  frames: anims.generateFrameNames('dessinatrice1', { prefix: 'marche', start: 0, end: 8 }),
  frameRate: 5,
  repeat: -1
});
anims.create({
  key: "jump",
  frames: anims.generateFrameNames('dessinatrice1', { prefix: 'jump', start: 0, end: 7 }),
  frameRate: 7,
  repeat: 0
});

anims.create({
  key: "idle_walk",
  frames: anims.generateFrameNames('dessinatrice1', { prefix: 'marche', start: 5, end: 5 }),
  frameRate: 1,
  repeat: -1
});

}

export default Animations;
