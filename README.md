# jeu-du-drapeau-phaser3

## JSDOC
### commande a executer à la racine du dossier
jsdoc -r server -t jsdoc

## Liens que j'ai suivi pour le tutorielle authoritarive serveur
https://phasertutorials.com/creating-a-simple-multiplayer-game-in-phaser-3-with-an-authoritative-server-part-3/?a=13

## Site pour faire des Sprite
https://gammafp.com/tool/atlas-packer/ ATLAS PACKER

https://www.codeandweb.com/free-sprite-sheet-packer SPRITE SHEET PACKER


https://www.iloveimg.com/resize-image#resize-options,pixels
il faut mettre 2 et 2 en px  et 30 images max a chaque fois
et cette image il faut la mettre dans server/authoritavie_server/assets/personnages/dessinatrice1/et l image


## pour cree des animations


pour lancer lanimation je dois aller dans le fichier 
server/authoriative_server/js/game.js

ensuite aller dans la function update()

dedans aller sur la commande a ou z ou e ou r

dans le if tu mets 
player.play("straightlead",true) // straightlead il faut le remplacer par le nom de lanimation que on voit dans le atlas json


ensuite mettre lanimation encore game.js
vers  275 

ex( cest la meme animation dans liste-animation et rajouter les this):
this.anims.create({
        key: "cross",
        frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'cross', start: 0, end: 4 }),
        frameRate: 3, 
        repeat: 0
      })




## Boss
1er boss fusion entre le micro, chaise roulant + nosferatu resident evil 
pour le battre il faut lattaquer dans son dos

2eme boss
batman +manette
pour le battre il faut taper sur son projectile
parfois ecran noir et fait tomber des manettes du ciels il faut esquiver
