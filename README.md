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
*   [parametres][23]
    *   [etatInitial][24]
    *   [toucheA][25]
        *   [Parameters][26]
*   [ninja][27]
*   [ninja2][28]
*   [aventuriere2][29]
*   [chevalier][30]
*   [naruto][31]
*   [socleJoueur][32]
*   [attacked][33]
*   [right][34]
*   [canonMaintenu][35]
    *   [Parameters][36]
*   [x][37]
*   [changementVieEquipe][38]
    *   [Parameters][39]
*   [changementVie][40]
    *   [Parameters][41]
*   [finDeVie][42]
    *   [Parameters][43]
*   [finDeVie][44]
    *   [Parameters][45]

## invisible

Rendre invisible un joueur

### Parameters

*   `scene` **[Object][46]** Scene du jeu
*   `player` **[Object][46]** le joueur qui est a rendre invisible

## tirer

Charger et tirer une boule (pouvoir de Naruto) llll

### Parameters

*   `scene` **[Object][46]** Scene du jeu
*   `player` **[Object][46]** le joueur qui tire la boule
*   `relache` **[Boolean][47]** indique si le joueur maintient ou relache le bouton

## agrandissement

Change la taille du joueur (pouvoir)

### Parameters

*   `scene` **[Object][46]** Scene du jeu
*   `player` **[Object][46]** joueur qui s'aggrandis

## toupie

Effectuer plusieurs rotation sur le joueur pendant 2secondes

### Parameters

*   `tweens` **[Object][46]** gestion de l'animation pour le décompte
*   `player` **[Object][46]** joueur qui effectue la rotation

## saut

Effectuer un saut sur un joueur

### Parameters

*   `chargeSaut` **[Boolean][47]** indique si le joueur maintient ou relache le bouton
*   `scene` **[Object][46]** Scene du jeu
*   `player` **[Object][46]** joueur qui effectue un saut

## recevoirDegat

Recevoir des dégats pour un joueur

### Parameters

*   `scene` **[Object][46]** Scene du jeu
*   `player` **[Object][46]** joueur qui recoit les dégats

## attaque

Effectuer une attaque ou/et un repoussement sur un objet|joueur

### Parameters

*   `charge` **[Boolean][47]** indique si le joueur maintient ou relache le bouton
*   `scene` **[Object][46]** Scene du jeu
*   `player` **[Object][46]** joueur qui effectue une attaque

## interactionTonneauDrapeau

Interactions avec un tonneau|drapeau le plus proche du joueur
celon la direction du joueur (droite|gauche)

si le joueur ne tient pas de tonneau|drapeau: attrape le tonneau|drapeau le plus proche
sinon détache le tonneau du joueur

créer un rectangle de zone d'attaque à droite ou a gauche du joueur (celon sa direction)
recupere et filtre les objets à l'interieur du rectangle et interagit avec eux

### Parameters

*   `player` **[Object][46]** joueur qui interagie avec l'objet (tonneau|drapeau)
*   `scene` **[Object][46]** Scene du jeu

## interactionTirolienne

Utiliser la tirolienne quand le joueur est proche de celle ci

### Parameters

*   `player` **[Object][46]** joueur qui utilise la tirolienne
*   `scene` **[Object][46]** Scene du jeu

## gestionVie

Diminuer la vie d'un joueur ou faire perdre le joueur

### Parameters

*   `vie` **[Number][48]** vie du joueur qui est attaqué
*   `id` **[String][49]** id du joueur qui est attaqué
*   `tween` **[Object][46]** animation pour la fin de vie
*   `superAttaque` **[Boolean][47]** indique si le joueur qui attaque a chargé au maximum son a
*   `direction` **[String][49]** direction du joueur qui attaque (droite|gauche)

## gestionTonneaux

pousser un tonneau celon la puissance émis par le joueur

### Parameters

*   `puissance` **[Number][48]** charge du joueur
*   `rotation` **[Boolean][47]** position du joueur face au tonneau (droite|gauche)
*   `tonneau` **[Object][46]** tonneau ciblé

## parametres

Configuration des chaque joueur

### etatInitial

documented as Dessinatrice.etatInitial

### toucheA

documented as Dessinatrice.toucheA

#### Parameters

*   `charge`  
*   `scene`  
*   `player`  

## ninja

Ninja

## ninja2

Ninja2

## aventuriere2

Aventuriere2

## chevalier

Chevalier

## naruto

Naruto

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

*   `constraints` **[Object][46]** attache des joueurs
*   `constraints` **[Object][46]** \['bullet'] attache de la balle correspondant au joueur

## x

ROTATION CANON

## changementVieEquipe

DIMINUTION VIE EQUIPE SELON LA PUISSANCE DE L'ATTAQUE DU JOUEUR

### Parameters

*   `equipe` **[String][49]** nom de l'equipe (A|B)
*   `puissance` **[Number][48]** Puissance du joueur qui a attaqué
*   `puissanceDeBase` **[Number][48]** Puissance de base du joueur qui a attaqué

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

*   `id` **[String][49]** id du joueur ciblé

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

[23]: #parametres

[24]: #etatinitial

[25]: #touchea

[26]: #parameters-11

[27]: #ninja

[28]: #ninja2

[29]: #aventuriere2

[30]: #chevalier

[31]: #naruto

[32]: #soclejoueur

[33]: #attacked

[34]: #right

[35]: #canonmaintenu

[36]: #parameters-12

[37]: #x

[38]: #changementvieequipe

[39]: #parameters-13

[40]: #changementvie

[41]: #parameters-14

[42]: #findevie

[43]: #parameters-15

[44]: #findevie-1

[45]: #parameters-16

[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[47]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[48]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[49]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
