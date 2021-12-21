# jeu-du-drapeau-phaser3

### Table of Contents

*   [invisible][1]
    *   [Parameters][2]
*   [tirer][3]
    *   [Parameters][4]
*   [agrandissement][5]
    *   [Parameters][6]
*   [toupie][7]
    *   [Parameters][8]
*   [saut][9]
    *   [Parameters][10]
*   [recevoirDegat][11]
    *   [Parameters][12]
*   [attaque][13]
    *   [Parameters][14]
*   [interactionTonneauDrapeau][15]
    *   [Parameters][16]
*   [interactionTirolienne][17]
    *   [Parameters][18]
*   [gestionVie][19]
    *   [Parameters][20]
*   [gestionTonneaux][21]
    *   [Parameters][22]
*   [socleJoueur][23]
*   [attacked][24]
*   [right][25]
*   [canonMaintenu][26]
    *   [Parameters][27]
*   [x][28]
*   [changementVieEquipe][29]
    *   [Parameters][30]
*   [changementVie][31]
    *   [Parameters][32]
*   [finDeVie][33]
    *   [Parameters][34]
*   [finDeVie][35]
    *   [Parameters][36]

## invisible

Rendre invisible un joueur

### Parameters

*   `scene` **[Object][37]** Scene du jeu
*   `player` **[Object][37]** le joueur qui est a rendre invisible

## tirer

Charger et tirer une boule (pouvoir de Naruto) llll

### Parameters

*   `scene` **[Object][37]** Scene du jeu
*   `player` **[Object][37]** le joueur qui tire la boule
*   `relache` **[Boolean][38]** indique si le joueur maintient ou relache le bouton

## agrandissement

Change la taille du joueur (pouvoir)

### Parameters

*   `scene` **[Object][37]** Scene du jeu
*   `player` **[Object][37]** joueur qui s'aggrandis

## toupie

Effectuer plusieurs rotation sur le joueur pendant 2secondes

### Parameters

*   `tweens` **[Object][37]** gestion de l'animation pour le décompte
*   `player` **[Object][37]** joueur qui effectue la rotation

## saut

Effectuer un saut sur un joueur

### Parameters

*   `chargeSaut` **[Boolean][38]** indique si le joueur maintient ou relache le bouton
*   `scene` **[Object][37]** Scene du jeu
*   `player` **[Object][37]** joueur qui effectue un saut

## recevoirDegat

Recevoir des dégats pour un joueur

### Parameters

*   `scene` **[Object][37]** Scene du jeu
*   `player` **[Object][37]** joueur qui recoit les dégats

## attaque

Effectuer une attaque ou/et un repoussement sur un objet|joueur

### Parameters

*   `charge` **[Boolean][38]** indique si le joueur maintient ou relache le bouton
*   `scene` **[Object][37]** Scene du jeu
*   `player` **[Object][37]** joueur qui effectue une attaque

## interactionTonneauDrapeau

Interactions avec un tonneau|drapeau le plus proche du joueur
celon la direction du joueur (droite|gauche)

si le joueur ne tient pas de tonneau|drapeau: attrape le tonneau|drapeau le plus proche
sinon détache le tonneau du joueur

créer un rectangle de zone d'attaque à droite ou a gauche du joueur (celon sa direction)
recupere et filtre les objets à l'interieur du rectangle et interagit avec eux

### Parameters

*   `player` **[Object][37]** joueur qui interagie avec l'objet (tonneau|drapeau)
*   `scene` **[Object][37]** Scene du jeu

## interactionTirolienne

Utiliser la tirolienne quand le joueur est proche de celle ci

### Parameters

*   `player` **[Object][37]** joueur qui utilise la tirolienne
*   `scene` **[Object][37]** Scene du jeu

## gestionVie

Diminuer la vie d'un joueur ou faire perdre le joueur

### Parameters

*   `vie` **[Number][39]** vie du joueur qui est attaqué
*   `id` **[String][40]** id du joueur qui est attaqué
*   `tween` **[Object][37]** animation pour la fin de vie
*   `superAttaque` **[Boolean][38]** indique si le joueur qui attaque a chargé au maximum son attaque
*   `direction` **[String][40]** direction du joueur qui attaque (droite|gauche)

## gestionTonneaux

pousser un tonneau celon la puissance émis par le joueur

### Parameters

*   `puissance` **[Number][39]** charge du joueur
*   `rotation` **[Boolean][38]** position du joueur face au tonneau (droite|gauche)
*   `tonneau` **[Object][37]** tonneau ciblé

## socleJoueur

COLISION GROUPE
1: platforme
2: joueur

## attacked

INTERACTION AVEC LES AUTRES PERSONNAGES

## right

DROITE-GAUCHE

## canonMaintenu

TIROLIENNE
QUAND LE JOUEUR EST PROCHE DE LA TIROLIENNE
LE JOUEUR SUIT LA BALLE DE LA TIROLIENNE
SINON IL S'EN DETACHE

### Parameters

*   `constraints` **[Object][37]** attache des joueurs
*   `constraints` **[Object][37]** \['bullet'] attache de la balle correspondant au joueur

## x

ROTATION CANON

## changementVieEquipe

DIMINUTION VIE EQUIPE SELON LA PUISSANCE DE L'ATTAQUE DU JOUEUR

### Parameters

*   `equipe` **[String][40]** nom de l'equipe (A|B)
*   `puissance` **[Number][39]** Puissance du joueur qui a attaqué
*   `puissanceDeBase` **[Number][39]** Puissance de base du joueur qui a attaqué

## changementVie

DIMINUTION VIE DU JOUEUR: NOMBRE DE VIE -1

### Parameters

*   `id`  
*   `tween`  
*   `superAttaque`  
*   `direction`  

## finDeVie

REMISE A 5 DE LA VIE DU JOUEUR
RESPAWN AVEC ANIMATION

### Parameters

*   `id`  

## finDeVie

Fin de vie d'un joueur
Retour au spawn

### Parameters

*   `id` **[String][40]** id du joueur ciblé

[1]: #invisible

[2]: #parameters

[3]: #tirer

[4]: #parameters-1

[5]: #agrandissement

[6]: #parameters-2

[7]: #toupie

[8]: #parameters-3

[9]: #saut

[10]: #parameters-4

[11]: #recevoirdegat

[12]: #parameters-5

[13]: #attaque

[14]: #parameters-6

[15]: #interactiontonneaudrapeau

[16]: #parameters-7

[17]: #interactiontirolienne

[18]: #parameters-8

[19]: #gestionvie

[20]: #parameters-9

[21]: #gestiontonneaux

[22]: #parameters-10

[23]: #soclejoueur

[24]: #attacked

[25]: #right

[26]: #canonmaintenu

[27]: #parameters-11

[28]: #x

[29]: #changementvieequipe

[30]: #parameters-12

[31]: #changementvie

[32]: #parameters-13

[33]: #findevie

[34]: #parameters-14

[35]: #findevie-1

[36]: #parameters-15

[37]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[38]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[39]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[40]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
