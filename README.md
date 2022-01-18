# jeu-du-drapeau-phaser3

## JSDOC
### commande a executer à la racine du dossier
jsdoc -r server -t jsdoc

## Liens que j'ai suivi pour le tutorielle authoritarive serveur
https://phasertutorials.com/creating-a-simple-multiplayer-game-in-phaser-3-with-an-authoritative-server-part-3/?a=13

## Site pour faire des Sprite
https://gammafp.com/tool/atlas-packer/ ATLAS PACKER

https://www.codeandweb.com/free-sprite-sheet-packer SPRITE SHEET PACKER




## pour cree des animations

scenes/elements/liste-animation


la function animation se fait instancier dans le fichier scene/arene.js
et donc ça lance direct



ensuite pour lancer lanimation je dois aller dans le fichier 
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
