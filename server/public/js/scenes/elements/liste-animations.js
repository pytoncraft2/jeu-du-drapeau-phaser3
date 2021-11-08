function Animations(anims) {

anims.create({
  key: "attack1_dessinatrice1",
  frames: anims.generateFrameNumbers('dessinatrice1', {
    frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil','pas_jkd']
  }),
  frameRate: 6,
  repeat: 0
});

anims.create({
  key: "run_dessinatrice1",
  frames: anims.generateFrameNumbers('dessinatrice1', {
    frames: ['pas_jkd','pas_jkd2', 'pas_jkd4','pas_jkd3']
  }),
  frameRate: 6,
  repeat: 0
});


anims.create({
  key: "goback_dessinatrice1",
  frames: anims.generateFrameNumbers('dessinatrice1', {
    frames: ['dos5', 'dos7.8', 'dos8', 'dos9', 'dos10', 'dos11', 'dos3']
  }),
  frameRate: 7,
  repeat: 0
});


anims.create({
  key: "jump_dessinatrice1",
  frames: anims.generateFrameNumbers('dessinatrice1', {
    frames: ['jump0', 'jump1', 'jump2', 'jump3', 'jump4', 'jump5', 'jump0']
  }),
  frameRate: 8,
  repeat: 0
});


anims.create({
  key: "front_dessinatrice1",
  frames: anims.generateFrameNumbers('dessinatrice1', {
    frames: ['face5', 'face2', 'face3', 'face4', 'face1']
  }),
  frameRate: 6,
  repeat: 0
});
anims.create({
  key: "walk_dessinatrice1",
  frames: anims.generateFrameNumbers('dessinatrice1', {
    frames: ['profil_jkd11', 'profil_jkd13', 'profil_jkd14', 'profil_jkd15','profil_jkd8']
  }),
  frameRate: 5,
  repeat: 0
});

anims.create({
  key: "attack1_naruto",
  frames: anims.generateFrameNumbers('naruto', {
    frames: ['profil', 'position_a1', 'position_a2', 'position_a3', 'profil']
  }),
  frameRate: 6,
  repeat: 0
});

anims.create({
  key: "goback_naruto",
  frames: anims.generateFrameNumbers('naruto', {
    frames: ['dos5', 'dos7.8', 'dos8', 'dos9', 'dos10', 'dos11', 'dos3']
  }),
  frameRate: 7,
  repeat: 0
});

anims.create({
  key: "front_naruto",
  frames: anims.generateFrameNumbers('naruto', {
    frames: ['face1', 'face2', 'face3', 'face4', 'face5', 'face7']
  }),
  frameRate: 6,
  repeat: 0
});
anims.create({
  key: "walk_naruto",
  frames: anims.generateFrameNumbers('naruto', {
    frames: ['profil3', 'profil4', 'profil5', 'profil6']
  }),
  frameRate: 5,
  repeat: 0
});


}

export default Animations;
